from pydantic import BaseModel, Field
from typing import List, Optional


class DancerCreateRequest(BaseModel):
    """댄서 생성 요청"""
    name: str = Field(
        description="댄서 이름 (main_name으로 사용됨)",
        examples=["김민준", "박지은", "이수진"],
        min_length=1,
        max_length=20
    )
    instagram: Optional[str] = Field(
        default=None,
        description="댄서 인스타그램 아이디",
        examples=["dancer_minjun", "jieun_dance", "sujin.choreography"],
        max_length=50
    )
    genre: Optional[str] = Field(
        default=None,
        description="댄스 장르 (CHOREOGRAPHY, HIPHOP, GIRLS HIPHOP, BRAEKING, LOCKING, POPPING, HOUSE, KRUMP, WACKKING, VOGUING, HEEL, SOUL, AFRO, K-POP, CONTEMPORARY, JAZZ, DANCEHALL)",
        examples=["HIPHOP", "CHOREOGRAPHY", "POPPING"]
    )
    user_id: Optional[str] = Field(
        default=None,
        description="연결할 사용자 ID (선택사항)",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )


class DancerEditRequest(BaseModel):
    """댄서 정보 수정 요청"""
    dancer_id: str = Field(
        description="댄서 고유 식별자",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )
    main_name: Optional[str] = Field(
        default=None,
        description="댄서 대표 이름",
        examples=["김민준", "박지은"],
        max_length=20
    )
    names: Optional[List[str]] = Field(
        default=None,
        description="댄서 이름 목록",
        examples=[["김민준", "Min Jun Kim"], ["박지은"]]
    )
    instagram: Optional[str] = Field(
        default=None,
        description="댄서 인스타그램 아이디",
        examples=["dancer_minjun", "jieun_dance", "sujin.choreography"],
        max_length=50
    )
    genre: Optional[str] = Field(
        default=None,
        description="댄스 장르",
        examples=["HIPHOP", "CHOREOGRAPHY", "POPPING"]
    )
    is_verified: Optional[bool] = Field(
        default=None,
        description="인증 상태"
    )


class DancerNameAddRequest(BaseModel):
    """댄서 이름 추가 요청"""
    dancer_id: str = Field(
        description="댄서 고유 식별자",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )
    name: str = Field(
        description="추가할 댄서 이름",
        examples=["Kim Min Jun", "민준"],
        min_length=1,
        max_length=20
    )


class DancerDeleteRequest(BaseModel):
    """댄서 삭제 요청"""
    dancer_id: str = Field(
        description="삭제할 댄서의 고유 식별자",
        examples=["550e8400-e29b-41d4-a716-446655440000"]
    )