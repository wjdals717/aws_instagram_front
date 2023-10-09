import React from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { authenticate } from '../apis/api/account';
import { useQuery } from 'react-query';
import Loading from '../components/Loading/Loading';

function AuthRoute({ element }) {
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const permitAllPath = ["/accounts"];
    // const [ authenticated, setAuthenticated ] = useState(false);

    //account에 들어있는 authenticate에서 요청이 갔다가 온 응답에 대해 요청이 이뤄짐
    const authenticateState = useQuery(["authenticate"], authenticate, {
        retry: 0,
        refetchOnWindowFocus: false         //최초 한 번만 리패치되고 이후에는 리패치 안 되도록
        // onError: (error) => {
        //     console.log(error);
        // }
    });

    // console.log(authenticateState);
    
    if(authenticateState.isLoading){
        console.log("로딩 중...");
        return <Loading />;
    }

    if(authenticateState.isError) {     //인증(로그인)이 되지 않은 경우
        for(let path of permitAllPath){
            if(pathname.startsWith(path)){
                return element;
            }
        }
        return <Navigate to={"/accounts/login"} />;
    }

    for(let path of permitAllPath){     //로그인이 되어있는데 회원가입 페이지로 들어온 경우
        if(pathname.startsWith(path)){
            return <Navigate to={"/"} />;
        }
    }

    return element;

    /*
    useEffect(() => {
        authenticate()              //무조건 요청을 날림
        .then(response => {         //token이 정상일 경우
            setAuthenticated(response.data);    //true
            for(let path of permitAllPath) {    
                if(pathname.startsWith(path)){      //permitAllPath의 주소, "/accounts"로 시작하는가
                    if(authenticated) {             //인증이 되었는가 -> 로그인 한 상태로 들어옴
                        navigate("/");              //인증이 되었으면 home으로 보내버리기~
                    }
                }
            }
        })
        .catch(error => {       //token이 없는 상태에서 home으로 들어갈 경우
            alert(error.response.data);
            setAuthenticated(false);        //만료된 상태(false)로 유지
            if(!authenticated) {            //인증이 안 되어있다면 //authenticated가 false일 경우(비동기 -> authenticated가 안 바뀌었을 수도 있음!!!)
                navigate("/accounts/login");//로그인 페이지로 이동시킴
            }
        });
    }, [authenticated]);

    return element;         //페이지 루트로 이동
    */
}

export default AuthRoute;