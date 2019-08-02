import React from "react";
import styled from "styled-components";

export default function SendMessageForm({ disabled, handleChange, value, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <SendMessage
                    onFocus={e => (e.target.placeholder = "")}
                    onBlur={e => (e.target.placeholder = "Type your message and hit ENTER")}
                    disabled={disabled}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder={
                        disabled
                            ? "Join a room to send messages"
                            : "Type your message and hit ENTER"
                    }
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
    font-size: 25px;
    border: 1px solid black;
    ::placeholder {
        color: black;
        font-size: 20px;
        padding: 10px;
    }
    :focus {
        padding-left: 10px;
        background-color: aliceblue;
    }
    :disabled {
        background: #D3D2CE;
    }
`;
