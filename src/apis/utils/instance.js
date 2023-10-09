import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8080",       //매번 타이핑하는 불편함 최소화 -> 모듈화
    headers: {
        Authorization: !!localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "" //accessToken이 들어있으면 accessToken 사용
        //token이 바뀌어도 Authorization은 변경되지 않음
    }
});

export default instance;