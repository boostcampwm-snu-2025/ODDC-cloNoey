from fastapi import Depends
from typing import Annotated

from server.features.search.store import SearchStore
from server.features.search.dto.responses import SearchResponse
from server.features.studio.dto.responses import StudioResponse
from server.features.dancer.dto.responses import DancerResponse


class SearchService:
    def __init__(self, search_db_store: Annotated[SearchStore, Depends()]):
        self.search_db_store = search_db_store

    async def search(self, keyword: str) -> SearchResponse:
        """통합 검색"""
        studios, dancers = await self.search_db_store.search(keyword)

        return SearchResponse(
            studios=[StudioResponse.from_studio(s) for s in studios],
            dancers=[DancerResponse.from_dancer(d) for d in dancers]
        )
