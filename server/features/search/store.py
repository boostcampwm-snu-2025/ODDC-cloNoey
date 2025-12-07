from sqlalchemy.sql import select
from typing import List, Tuple

from server.database.connection import SESSION
from server.features.studio.models import Studio
from server.features.dancer.models import Dancer


class SearchStore:
    def __init__(self) -> None:
        self.session = SESSION

    async def search(self, keyword: str) -> Tuple[List[Studio], List[Dancer]]:
        """스튜디오와 댄서를 검색 (전방 일치)"""
        # 스튜디오 검색
        studio_result = await self.session.scalars(
            select(Studio)
            .where(Studio.name.like(f"{keyword}%"))
            .execution_options(populate_existing=True)
        )
        studios = list(studio_result.all())

        # 댄서 검색 (main_name으로 검색)
        dancer_result = await self.session.scalars(
            select(Dancer)
            .where(Dancer.main_name.like(f"{keyword}%"))
            .execution_options(populate_existing=True)
        )
        dancers = list(dancer_result.all())

        return studios, dancers
