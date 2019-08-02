import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);
        console.log(node);
        node.scrollTop = node.scrollHeight - node.clientHeight;
    }
    render() {
        if (this.props.disabled) {
            return (
                <div
                    style={{ display: "grid", placeItems: "center", fontSize: "50px" }}
                    className="messageList"
                >
                    {" "}
                    JOIN A ROOM &rarr;
                </div>
            );
        } else {
            return (
                <div className="messageList">
                    {this.props.messages.map((message, index) => {
                        return (
                            <Message
                                key={index}
                                message={message.text}
                                username={message.senderId}
                            />
                        );
                    })}
                </div>
            );
        }
    }
}

export default MessageList;
