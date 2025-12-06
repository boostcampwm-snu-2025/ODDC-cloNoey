from fastapi import Depends, HTTPException
from typing import Annotated, List, Dict, Any, cast
import pandas as pd
from io import BytesIO

from server.features.dancer.models import Dancer
from server.features.dancer.dto.requests import *
from server.features.dancer.dto.responses import DancerResponse, DancerBulkUploadResponse
from server.features.dancer.store import DancerStore

class DancerService:
    def __init__(self, dancer_db_store: Annotated[DancerStore, Depends()]):
        self.dancer_db_store = dancer_db_store

    # endpoints
    async def create_dancer(self, dancer_request: DancerCreateRequest) -> DancerResponse:
        dancer = await self.dancer_db_store.create_dancer(
            name=dancer_request.name,
            instagram=dancer_request.instagram,
            genre=dancer_request.genre,
            user_id=dancer_request.user_id
        )
        return DancerResponse.from_dancer(dancer)
    
    async def edit_dancer(self, dancer_request: DancerEditRequest) -> DancerResponse:
        # 먼저 댄서를 조회
        dancer = await self.dancer_db_store.get_dancer_by_id(dancer_request.dancer_id)
        if dancer is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "댄서를 찾을 수 없습니다."}
            )
        # 수정
        updated_dancer = await self.dancer_db_store.edit_dancer(
            dancer=dancer,
            main_name=dancer_request.main_name,
            names=dancer_request.names,
            instagram=dancer_request.instagram,
            genre=dancer_request.genre,
            is_verified=dancer_request.is_verified
        )
        return DancerResponse.from_dancer(updated_dancer)

    async def add_dancer_name(self, dancer_request: DancerNameAddRequest) -> DancerResponse:
        # 먼저 댄서를 조회
        dancer = await self.dancer_db_store.get_dancer_by_id(dancer_request.dancer_id)
        if dancer is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "댄서를 찾을 수 없습니다."}
            )
        # 이름 추가
        updated_dancer = await self.dancer_db_store.add_dancer_name(
            dancer=dancer,
            name=dancer_request.name
        )
        return DancerResponse.from_dancer(updated_dancer)

    async def delete_dancer(self, dancer_request: DancerDeleteRequest) -> None:
        # 먼저 댄서를 조회
        dancer = await self.dancer_db_store.get_dancer_by_id(dancer_request.dancer_id)
        if dancer is None:
            raise HTTPException(
                status_code=404,
                detail={"message": "댄서를 찾을 수 없습니다."}
            )
        # 삭제
        await self.dancer_db_store.delete_dancer(dancer)


    # getters
    async def get_dancer_by_id(self, dancer_id: str) -> Dancer | None:
        return await self.dancer_db_store.get_dancer_by_id(dancer_id)

    async def get_dancer_by_name(self, name: str) -> List[Dancer]:
        return await self.dancer_db_store.get_dancer_by_name(name)

    async def get_dancer_by_instagram(self, instagram: str) -> Dancer | None:
        return await self.dancer_db_store.get_dancer_by_instagram(instagram)

    async def bulk_upload_dancers(self, file) -> DancerBulkUploadResponse:
        """
        CSV 파일을 파싱하여 여러 댄서를 일괄 생성/업데이트 (Upsert)

        CSV 형식: name,instagram
        예시:
        name,instagram
        김민준,dancer_minjun
        박지은,
        이수진,
        """
        try:
            # CSV 파일 읽기
            contents = await file.read()
            df = pd.read_csv(BytesIO(contents), dtype=str, keep_default_na=False)

            # 필수 컬럼 확인
            if "name" not in df.columns:
                return DancerBulkUploadResponse(
                    total=0,
                    success=0,
                    failed=1,
                    errors=[{
                        "row": 0,
                        "name": "",
                        "instagram": "",
                        "error": "CSV must have 'name' column"
                    }]
                )

            # DataFrame을 딕셔너리 리스트로 변환
            dancers_data = cast(List[Dict[str, Any]], df.to_dict(orient="records"))

            # Store의 배치 처리 호출
            success_count, errors = await self.dancer_db_store.create_or_update_dancers_bulk(dancers_data)

            total = len(dancers_data)
            failed = total - success_count

            return DancerBulkUploadResponse(
                total=total,
                success=success_count,
                failed=failed,
                errors=errors
            )

        except Exception as e:
            return DancerBulkUploadResponse(
                total=0,
                success=0,
                failed=1,
                errors=[{
                    "row": 0,
                    "name": "",
                    "instagram": "",
                    "error": f"File processing error: {str(e)}"
                }]
            )