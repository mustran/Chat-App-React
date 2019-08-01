import React from "react";
import styled from "styled-components";

export default function Message({ username, message }) {
    return (
        <MessageWrapper>
            <div className="username">{username}</div>
            <div className="message">{message}</div>
        </MessageWrapper>
    );
}


const MessageWrapper = styled.div`
    .username{
        font-size: 0.8rem;
        font-weight: bold;
    }
    .message{
        padding: 2px;
        background-color: blueviolet;
        color: white;
        width: max-content;
        margin-bottom: 5px;
        border-radius: 5px;
    }

`