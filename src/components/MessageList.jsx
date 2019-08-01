import React from "react";
import Message from "./Message";

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map(message => {
                return (
                    <Message key={message.id} message={message.text} username={message.senderId}/>
                );
            })}
        </div>
    );
};

export default MessageList;
