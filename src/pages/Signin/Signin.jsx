import React, { useEffect, useState } from 'react';
import SignInAndUpLayout from '../../components/Layouts/SignInAndUpLayout/SignInAndUpLayout';
import Top from '../../components/Layouts/SignInAndUpLayout/Top/Top';
import Input from '../../components/Layouts/SignInAndUpLayout/Input/Input';
import OrBar from '../../components/Layouts/SignInAndUpLayout/OrBar/OrBar';
import { signin } from '../../apis/api/account';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function Signin(props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    
    const emptyAccount = {
        phoneOrEmailOrUsername: "",
        loginPassword: ""
    }

    const [ account, setAccount ] = useState(emptyAccount);
    const [ isAccountValuesEmpty, setIsAccountValuesEmpty] = useState(true);
    const [ errorMsg, setErrorMsg ] = useState("");

    const changeAccount = (name, value) => {
        setAccount({
            ...account,
            [name]: value
        });
    }
    
    useEffect(() => { //빈값이 하나라도 있으면 작성이 완료되지 않은 상태
        setIsAccountValuesEmpty(Object.values(account).includes(""));
    }, [account]);
    
    const handleSigninSubmit = async () => {
        try{
            const response = await signin(account);
            localStorage.setItem("accessToken", "Bearer " + response.data); //JWT 특징 "Bearer "을 붙임
            window.location.reload();
            // queryClient.invalidateQueries(["authenticate"]);    //캐시값을 지우면서 리패치를 해줌
            // navigate("/");  //로그인 완료했으므로 페이지 이동
        } catch(error) {
            setErrorMsg(error.response.data.errorMessage);
        }
    }

    return (
        <SignInAndUpLayout>
            <Top>
                <div>
                    <Input name={"phoneOrEmailOrUsername"} changeAccount={changeAccount} placeholder={"전화번호, 사용자 이름 또는 이메일"}/>
                    <Input type={"password"} name={"loginPassword"} changeAccount={changeAccount} placeholder={"비밀번호"}/>
                    <button onClick={handleSigninSubmit} disabled={isAccountValuesEmpty} >로그인</button>
                    <OrBar />
                    <div>
                        Kakao로 로그인
                    </div>
                    <div>
                        {errorMsg}
                    </div>
                </div>
            </Top>
        </SignInAndUpLayout>
    );
}

export default Signin;