import React, { useState } from 'react';
/** @jsxImportSource @emotion/react */
import * as S from './Style'
import { GoHomeFill, GoHome } from 'react-icons/go'
import { FiSearch, FiInstagram } from 'react-icons/fi'
import {BsPlusSquareFill, BsPlusSquare} from 'react-icons/bs'
import NavItem from './NavItem/NavItem';
import { useNavigate } from 'react-router-dom';
import AddFeedModal from '../Modals/AddFeedModal/AddFeedModal';
import { useRecoilState } from 'recoil';
import { showModalState } from '../../store/atoms/ModalState';

function Sidebar(props) {
    const navigate = useNavigate();
    const [ showModal, setShowModal ] = useRecoilState(showModalState);
    
    const [ isSelectedList, setIsSelectedList ] = useState([true, false, false, false]);

    const handlehomeClick = () => {
        setIsSelectedList([true, false, false, false]);
    }

    const handleSearchClick = () => {
        setIsSelectedList([false, true, false, false]);
    }

    const handleAddFeedClick = () => {
        setIsSelectedList([false, false, true, false]);

        //ModalLayout을 렌더링
        setShowModal(<AddFeedModal />);
    }

    const handleProfileClick = () => {
        setIsSelectedList([false, false, false, true]);
    }

    return (
        <>

            <div css={S.SLayout}>
                <NavItem onClick={handlehomeClick}><FiInstagram /></NavItem>
                <NavItem onClick={handlehomeClick}>{isSelectedList[0] ? <GoHomeFill /> : <GoHome /> }</NavItem>
                <NavItem onClick={handleSearchClick}><FiSearch /></NavItem>
                <NavItem onClick={handleAddFeedClick}>{isSelectedList[2] ? <BsPlusSquareFill /> : <BsPlusSquare /> }</NavItem>
                <NavItem onClick={handleProfileClick}><FiInstagram /></NavItem>
            </div>
        </>
    );
}

export default Sidebar;