import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((message,index) => {
                return (
                    <Message key={index} message={message.text} username={message.senderId}/>
                );
            })}
        </div>
    );
};

export default MessageList;
