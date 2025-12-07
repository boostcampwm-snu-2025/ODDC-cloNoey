from pydantic import BaseModel
from typing import List

from server.features.studio.dto.responses import StudioResponse
from server.features.dancer.dto.responses import DancerResponse


class SearchResponse(BaseModel):
    """통합 검색 결과"""
    studios: List[StudioResponse]
    dancers: List[DancerResponse]
