import { css } from "@emotion/react";

export const SLayout = css`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 4px 0;
    border-radius: 10px;
    padding: 12px;
    width: 48px;
    height: 48px;

    font-size: 26px;
    cursor: pointer;
    &:active {
        background-color: #f2f2f2;
        font-size: 23px;
        color: #555;
    }
`;