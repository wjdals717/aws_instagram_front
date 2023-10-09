/** @jsxImportSource @emotion/react */
import { NAME, PASSWORD, PHONE_OR_EMAIL, USERNAME } from '../../../../constants/regex';
import * as S from './Style'
import React, { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { BsCheckCircle } from 'react-icons/bs';

function Input({ type, placeholder, name, changeAccount }) {
    const [ isEmpty, setIsEmpty ] = useState(true);
    const [ inputValue, setInputValue ] = useState("");
    const [ inputState, setInputState ] = useState("");

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        changeAccount(e.target.name, e.target.value);
    }

    const handleInputOnblur = (e) => {  // focus가 벗어났을 때
        const value = e.target.value;
        let regex = null;
        
        switch(e.target.name) {
            case "phoneOrEmail": regex = PHONE_OR_EMAIL; break;
            case "name": regex = NAME; break;
            case "username": regex = USERNAME; break;
            case "password": regex = PASSWORD; break;
            default: regex = null;
        }

        if(!!regex && !regex.test(value)) {    // match되면 true, 안 되면 false
            // console.log(`${e.target.name}, 매칭되지 않음`);
            setInputState(<><ImCancelCircle/></>)
        } else if(!!regex && regex.test(value)) {
            setInputState(<><BsCheckCircle /></>);
        } else {
            setInputState("");
        }
    }

    const handleInputOnFocus = () => {  //input에 focus가 위치하면 초기화
        setInputState("");
    }

    useEffect(() => {
        setIsEmpty(!inputValue);
    }, [inputValue]);

    return (
        <div css={S.SLayout}>
            <label css={S.SInput(isEmpty)}>
                <input type={type} name={name} onChange={handleInputChange} onBlur={handleInputOnblur} onFocus={handleInputOnFocus}/>
                <span>{placeholder}</span>
            </label>
            <div css={S.SStateBox}>
                {inputState}
            </div>
        </div>
    );
}

Input.defaultProps = {
    type: "text", 
    placeholder: "",
    name: ""
}

export default Input;