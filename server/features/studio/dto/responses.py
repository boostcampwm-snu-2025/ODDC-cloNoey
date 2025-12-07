from pydantic import BaseModel
from typing import Optional

from server.features.studio.models import Studio


class StudioResponse(BaseModel):
    studio_id: str
    user_id: Optional[str]
    name: str
    instagram: Optional[str]
    location: Optional[str]
    email: Optional[str]
    website: Optional[str]
    is_verified: bool
    reservation_form: Optional[str]
    default_duration: Optional[str]  # Return as HH:MM:SS string
    default_price: Optional[int]
    youtube: Optional[str]
    bio: Optional[str]
    role: Optional[str]  # User.role.value if user exists

    @staticmethod
    def from_studio(studio: Studio) -> "StudioResponse":
        return StudioResponse(
            studio_id=studio.studio_id,
            user_id=studio.user_id,
            name=studio.name,
            instagram=studio.instagram,
            location=studio.location,
            email=studio.email,
            website=studio.website,
            is_verified=studio.is_verified,
            reservation_form=studio.reservation_form,
            # Convert time object to string for JSON serialization
            default_duration=studio.default_duration.strftime("%H:%M:%S") if studio.default_duration else None,
            default_price=studio.default_price,
            youtube=studio.youtube,
            bio=studio.bio,
            role=studio.user.role.value if studio.user else None
        )
