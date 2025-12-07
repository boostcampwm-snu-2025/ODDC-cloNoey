from fastapi import HTTPException

def studio_creation_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail = {"message" : f"스튜디오 정보 등록에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )

def studio_edit_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail = {"message" : f"스튜디오 정보 수정에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )

def studio_delete_error(e: Exception):
    raise HTTPException(
        status_code=400,
        detail = {"message" : f"스튜디오 삭제에 실패했습니다: {type(e).__name__} - {str(e)}"}
    )
