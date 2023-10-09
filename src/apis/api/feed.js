import instance from "../utils/instance"

export const uploadFeed = async (feedFormData) => {
    const option = {
        headers: {
            "Content-Type": "multipart/form-data"
            // 현재까지는 JSON형태였음, 요청할 때 데이터 형식을 변환시켜줘야 함
        }
    }
    return await instance.post(`/api/v1/feed/`, feedFormData, option);
}