import React from "react";
import styled from "styled-components";

export default function SendMessageForm({ disabled, handleChange, value, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SendMessage
                    disabled={disabled}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder="Type your message and hit ENTER"
                />
            </form>
        </div>
    );
}

const SendMessage = styled.input`
    width: 100%;
    /* border: 1px solid black; */
    border: 0;
    margin: 0;
    padding: 0;
    height: 100%;
    position: absolute;
    z-index: 1;
    ::placeholder{
        color: red;
        font-size: 20px;
        padding: 10px;
    }
    background: #ffd;
`;
