from fastapi import HTTPException

def dancer_creation_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail = {"message" : f"댄서DB 정보 등록에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )

def dancer_edit_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail = {"message" : f"댄서DB 정보 수정에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )

def dancer_delete_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail = {"message" : f"댄서 삭제에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )