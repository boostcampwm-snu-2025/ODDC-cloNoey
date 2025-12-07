from fastapi import APIRouter, Query, Depends
from typing import Annotated
from starlette.status import HTTP_200_OK

from server.features.search.service import SearchService
from server.features.search.dto.responses import SearchResponse


search_router = APIRouter()


@search_router.get("/", status_code=HTTP_200_OK,
                   summary="통합 검색",
                   description="스튜디오와 댄서를 통합 검색합니다 (전방 일치).")
async def search(
    search_service: Annotated[SearchService, Depends()],
    keyword: str = Query(..., description="검색어", min_length=1)
) -> SearchResponse:
    """통합 검색 엔드포인트"""
    return await search_service.search(keyword)
