from fastapi import APIRouter, Query, HTTPException, Depends
from typing import Annotated
from starlette.status import HTTP_200_OK, HTTP_204_NO_CONTENT

from server.features.studio.service import StudioService
from server.features.studio.dto.requests import (
    StudioCreateRequest,
    StudioEditRequest,
    StudioDeleteRequest
)
from server.features.studio.dto.responses import StudioResponse


studio_router = APIRouter()


# ======================== CREATE ========================

@studio_router.post("/create", status_code=HTTP_200_OK,
                    summary="스튜디오 생성",
                    description="새로운 스튜디오를 생성합니다.")
async def create_studio(
    studio_service: Annotated[StudioService, Depends()],
    studio_request: StudioCreateRequest,
) -> StudioResponse:
    """스튜디오 생성 엔드포인트"""
    return await studio_service.create_studio(studio_request)


# ======================== READ ========================

@studio_router.get("/{studio_id}", status_code=HTTP_200_OK,
                   summary="스튜디오 조회 (ID)",
                   description="스튜디오 ID로 스튜디오 정보를 조회합니다.")
async def get_studio_by_id(
    studio_service: Annotated[StudioService, Depends()],
    studio_id: str
) -> StudioResponse:
    """스튜디오 ID로 조회"""
    studio = await studio_service.get_studio_by_id(studio_id)
    if studio is None:
        raise HTTPException(
            status_code=404,
            detail={"message": "스튜디오를 찾을 수 없습니다."}
        )
    return StudioResponse.from_studio(studio)


@studio_router.get("/", status_code=HTTP_200_OK,
                   summary="스튜디오 조회 (이름)",
                   description="스튜디오 이름으로 정보를 조회합니다.")
async def get_studio_by_name(
    studio_service: Annotated[StudioService, Depends()],
    name: str = Query(..., description="검색할 스튜디오 이름")
) -> StudioResponse:
    """스튜디오 이름으로 조회"""
    studio = await studio_service.get_studio_by_name(name)
    if studio is None:
        raise HTTPException(
            status_code=404,
            detail={"message": "스튜디오를 찾을 수 없습니다."}
        )
    return StudioResponse.from_studio(studio)


@studio_router.get("/instagram/{instagram}", status_code=HTTP_200_OK,
                   summary="스튜디오 조회 (인스타그램)",
                   description="인스타그램 아이디로 스튜디오 정보를 조회합니다.")
async def get_studio_by_instagram(
    studio_service: Annotated[StudioService, Depends()],
    instagram: str
) -> StudioResponse:
    """인스타그램 아이디로 조회"""
    studio = await studio_service.get_studio_by_instagram(instagram)
    if studio is None:
        raise HTTPException(
            status_code=404,
            detail={"message": "스튜디오를 찾을 수 없습니다."}
        )
    return StudioResponse.from_studio(studio)


# ======================== UPDATE ========================

@studio_router.patch("/{studio_id}", status_code=HTTP_200_OK,
                     summary="스튜디오 정보 수정",
                     description="스튜디오의 정보를 수정합니다.")
async def edit_studio(
    studio_service: Annotated[StudioService, Depends()],
    studio_request: StudioEditRequest,
) -> StudioResponse:
    """스튜디오 정보 수정"""
    return await studio_service.edit_studio(studio_request)


# ======================== DELETE ========================

@studio_router.delete("/{studio_id}", status_code=HTTP_204_NO_CONTENT,
                      summary="스튜디오 삭제",
                      description="스튜디오를 삭제합니다.")
async def delete_studio(
    studio_service: Annotated[StudioService, Depends()],
    studio_request: StudioDeleteRequest,
) -> None:
    """스튜디오 삭제"""
    return await studio_service.delete_studio(studio_request)
