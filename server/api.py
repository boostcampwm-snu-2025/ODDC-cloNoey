from fastapi import APIRouter

from server.features.dancer.views import dancer_router

api_router = APIRouter()

api_router.include_router(dancer_router, prefix="/dancer", tags=["dancer"])