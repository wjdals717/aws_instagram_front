import React, { useEffect, useRef, useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import ModalLayout from '../ModalLayout/ModalLayout';
import ModalHeader from '../ModalHeader/ModalHeader';
import ModalBody from '../ModalBody/ModalBody';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { HiArrowNarrowLeft } from 'react-icons/hi'
import pubaoimg from '../../../assets/pubao.jpg'
import { uploadFeed } from '../../../apis/api/feed';

function SelectFeedImg ({ setPage, setFiles }) {
    const fileInputRef = useRef();

    const handleSelectImg = () => {
        fileInputRef.current.click();   //버튼이 클릭되면 input이 클릭되도록 함
    }

    const handleImgFileChange = (e) => {
        setFiles(e.target.files);
        setPage(2);                     //2번 페이지로 넘겨줌
    }

    return (
        <div css={S.SelectFeedImgContainer}>
            <svg aria-label="이미지나 동영상과 같은 미디어를 나타내는 아이콘" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="77" role="img" viewBox="0 0 97.6 77.3" width="96"><title>이미지나 동영상과 같은 미디어를 나타내는 아이콘</title><path d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z" fill="currentColor"></path><path d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z" fill="currentColor"></path><path d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z" fill="currentColor"></path></svg>
            <h1>사진과 동영상을 여기에 끌어다 놓으세요</h1>
            <button onClick={handleSelectImg}>컴퓨터에서 선택</button>
            <input type="file" name='file' multiple accept='image/gif, image/jpeg, image/jpg, image/png' 
            css={S.fileInput} ref={fileInputRef} onChange={handleImgFileChange}/>
        </div>
    );
}

function ReviewFeedImg({ files }) { //files는 file 리스트임
    const [ imgs, setImgs ] = useState([]);

    useEffect(()=> {
        const filesArray = Array.from(files);       //file 리스트는 Array가 아니라서 map을 돌릴 수 없음, array로 변경시켜줌
        const promises = filesArray.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();    //1개의 파일만 읽을 수 있음
                reader.onload = (e) => {            //정의
                    resolve(e.target.result);       //정상적으로 수행되어졌을 경우 promise 리턴값
                }
                reader.onerror = reject;
                reader.readAsDataURL(file);
                //map이 순서대로 돌기 때문에 setTimeout이 필요없음
            });
        })

        Promise.all(promises)   //Promise.all : 프로미스를 순서대로 실행시킴
        .then(result => {       //resolve를 통해서 리턴된 값인 e.target.result가 result임
            setImgs(result);
        })
        .catch(error => {
            console.log(error);
        });
    }, []); // 최초 한 번만 실행

    return (
        <div css={S.ReviewContainer}>
            <Carousel
            showArrows={true}
            autoPlay={false}
            infiniteLoop={false}
            showThumbs={false}>
                {imgs.map((img, index) => 
                    <div css={S.ImgBox} key={index}>
                        <img src={img} alt='' />
                    </div>
                )}
            </Carousel>
        </div>
    );
}

function FeedDetail({ isShow, setContent }) {
    const handleContentOnChange = (e) => {
        setContent(e.target.value);
    }

    return(
        <div css={S.FeedDetailContainer(isShow)}>
            <div css={S.ProfileContainer}>
                <div css={S.ProfileImgBox}>
                    <img src={pubaoimg} alt="" />
                </div>
                <div>닉네임</div>
            </div>
            <textarea css={S.FeedContent} name="" placeholder='문구를 입력하세요...' 
            onChange={handleContentOnChange}></textarea>
        </div>
    )
}

function AddFeedModal(props) {
    const [ page, setPage ] = useState(1);
    const [ bodyComponent, setBodyComponent ] = useState(<></>);
    const [ isShowFeedDetail, setIsShowFeedDetail ] = useState(false);

    const [ title, setTitle ] = useState("");
    const [ leftButton, setLeftButton ] = useState(<div></div>);
    const [ rightButton, setRightButton ] = useState(<div></div>);

    const [files, setFiles ] = useState([]);
    const [ content, setContent ] = useState("");

    const BackButton = () => {
        return(
            <div onClick={() => {setPage(page - 1)}}>
                <HiArrowNarrowLeft />
            </div>
        )
    }

    const NextButton = () => {
        return (
            <div onClick={() => {setPage(page + 1)}}>
                <span>다음</span>
            </div>
        )
    }

    const SubmitButton = () => {
        const handleSubmitClick = async () => {
            const formData = new FormData();        //map이라고 생각하면 됨
            formData.append("content", content);

            const fileArray = Array.from(files);    //파일 리스트 -> 배열로 변환해서 넣어줌
            fileArray.forEach(file => {
                formData.append("files", file);    
            })

            //formData를 서버에 던져주기만 하면 됨 -> api > feed.js
            try{
                await uploadFeed(formData);
                window.location.replace("/");       //home으로 이동
            } catch(error) {
                console.log(error);
                window.location.reload();
            }
        }

        return (
            <div onClick={handleSubmitClick}>
                <span>공유하기</span>
            </div>
        )
    }

    useEffect(() => {
        switch(page) {
            case 1:
                setBodyComponent(<SelectFeedImg setPage={setPage} setFiles={setFiles}/>);
                setTitle("새 게시물 만들기");
                setLeftButton(<div></div>);
                setRightButton(<div></div>);
                setIsShowFeedDetail(false);
                break;
            case 2:
                setBodyComponent(<>
                    <ReviewFeedImg files={files}/>
                    <FeedDetail isShow={isShowFeedDetail} setContent={setContent}/>
                </>);
                setTitle("미리보기");
                setIsShowFeedDetail(false);
                setLeftButton(BackButton());
                setRightButton(NextButton());
                break;
            case 3:
                setBodyComponent(<>
                    <ReviewFeedImg files={files}/>
                    <FeedDetail isShow={isShowFeedDetail} setContent={setContent}/>
                </>);
                setTitle("새 게시물 만들기");
                setIsShowFeedDetail(true);
                setLeftButton(BackButton());
                setRightButton(SubmitButton());
                break;
            default:
        }
    }, [ page, isShowFeedDetail, content ]); //페이지 번호가 바뀌면 useEffect 동작
    // 상태가 변했을 때 렌더링이 일어나도록 함

    return (
        <ModalLayout>
            <ModalHeader title={title} leftButton={leftButton} rightButton={rightButton}/>
            <ModalBody>
                { bodyComponent }
            </ModalBody>
        </ModalLayout>
    );
}

export default AddFeedModal;