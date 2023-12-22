/**
 * 이 클래스는 Custom Error를 제어하기 위한 class 입니다.
 */
class HduoError extends Error{
    constructor(message) {
        super(message);
    }
}

export default HduoError;