from fastapi import HTTPException

def invalid_token_error():
    raise HTTPException(
        status_code=401, 
        detail={
            "error_code": "INVALID_TOKEN",
            "message": "유효하지 않은 토큰입니다."
        }
    )

def expired_token_error():
    raise HTTPException(
        status_code=401, 
        detail={
            "error_code": "EXPIRED_TOKEN",
            "message": "만료된 토큰입니다."
        }
    )

def blocked_token_error():
    raise HTTPException(
        status_code=401, 
        detail={
            "error_code": "BLOCKED_TOKEN",
            "message": "차단된 토큰입니다."
        }
    )

def invalid_field_format_error(message: str):
    raise HTTPException(
        status_code=400, 
        detail={
            "error_code": "INVALID_FIELD_FORMAT",
            "message": message
        }
    )