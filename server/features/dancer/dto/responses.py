from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from server.features.dancer.models import Dancer

class DancerResponse(BaseModel):
    dancer_id: str
    main_name: str
    names: List[str]
    instagram: Optional[str]
    is_verified: bool
    genre: Optional[str]
    role: Optional[str]  # User.role.value if user exists

    @staticmethod
    def from_dancer(dancer: Dancer) -> "DancerResponse":
        return DancerResponse(
            dancer_id=dancer.dancer_id,
            main_name=dancer.main_name,
            names=dancer.names,
            instagram=dancer.instagram,
            is_verified=dancer.is_verified,
            genre=dancer.genre.value if dancer.genre else None,
            role=dancer.user.role.value if dancer.user else None
        )


class DancerBulkUploadResponse(BaseModel):
    """대량 업로드 결과"""
    total: int
    success: int
    failed: int
    errors: List[Dict[str, Any]]
