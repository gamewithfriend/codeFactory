/**
 * 이 클래스는 비동기 통신을 용이하게 하기 위한 class 입니다.
 */

class Fetcher {
    /**
     * @param (string) url - 서버 통신 url
     * @param (string) method - 서버 통신 방법(method)
     * @param (string) data - 서버에 보낼 데이터
     */
    url;
    method;
    data;
    contentType = "application/json;";
    constructor(url,method,data,contentType) {
        this.url=url;
        this.method=method.toUpperCase();
        this.data=data;
        if(contentType!=null) {
            this.contentType = contentType;
        }
    }

    /**
     * json으로 서버와 통신하기 위한 메서드
     * @returns {json} 서버통신 결과를 json 형식으로 return한다.
     */
    async jsonFetch() {
        // 변수 선언부
        let paramUrl;
        let response;

        // 먼저 데이터가 json 형식인지 체크
        if (!this.isJsonString()) {
            throw new Error("json 형식 데이터를 입력해주세요.");
        }
        
        // 메소드 방식에 따라 
        if(this.method == "GET" || this.method == "DELETE") {
            const queryParams = new URLSearchParams(data);
            paramUrl = this.url + "?" + queryParams;
            response = await this._urlFecth(paramUrl);
        } else if (this.method == "POST" || this.method == "PUT") {
            paramUrl = this.url;
            response = await this._bodyFecth(paramUrl);
        }
        return response;       
    }

    /**
     * formData로 서버와 통신하기 위한 메서드
     * @returns {json} 서버통신 결과를 json 형식으로 return한다.
     */
    async formDataFetch() {
        // 변수 선언부
        let paramUrl;
        let response;

        // 먼저 데이터가 json 형식인지 체크
        if (!this.isJsonString()) {
            throw new Error("json 형식 데이터를 입력해주세요.");
        }
        
        // 메소드 방식에 따라 
        if(this.method == "GET" || this.method == "DELETE") {
            throw new Error("multiPart 방식은 POST 또는 PUT 방식을 이용해주세요.");
        } else if (this.method == "POST" || this.method == "PUT") {
            paramUrl = this.url;
            this.contentType = "multipart/form-data";
            response = await this._bodyFecth(paramUrl);
        }
        return response;       
    }

    /**
     * get/delete 방식의 http 요청을 보낼 때 사용 하는 함수
     * @param {string} paramUrl
     */
    async _urlFecth(paramUrl) {
        try {
            const response = await fetch(paramUrl, {
                method: this.method,
                headers: {
                    'Content-type':'application/json; charset=utf-8'
                },
                }).then(response => response.json());
            return response;
        } catch (e) {
            console.log("error 발생", e);
        }
    }

    /**
     * post/put 방식의 http 요청을 보낼 때 사용 하는 함수
     * @param {string} paramUrl
     */
    async _bodyFecth(paramUrl) {
        try {
            const response = await fetch(paramUrl, {
                method: this.method,
                headers: {
                    'Content-type':this.contentType+'charset=utf-8'
                },
                body: this.data
                }).then(response => response.json());
            return response;
        } catch (e) {
            console.log("error 발생", e);
        }
    }

    /**
     * 파라미터의 타입이 json인지 여부를 확인하는 method
     * @returns {boolean} data의 json데이터 여부
     */
    isJsonString() {
        let isJsonData = false;
        try {
            let convData = JSON.parse(this.data);
            if (typeof convData === "object") {
                isJsonData = true;
            }
        } catch (e) {
            isJsonData = false;
        }
        return isJsonData
    }
}
export default Fetcher;