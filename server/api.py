from fastapi import APIRouter

from server.features.dancer.views import dancer_router
from server.features.studio.views import studio_router

api_router = APIRouter()

api_router.include_router(dancer_router, prefix="/dancer", tags=["dancer"])
api_router.include_router(studio_router, prefix="/studio", tags=["studio"])