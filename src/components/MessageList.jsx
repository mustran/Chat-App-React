import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
    componentDidUpdate() {
        const node = ReactDOM.findDOMNode(this);
        // console.log(node);
        node.scrollTop = node.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
    }
    render() {
        if (this.props.disabled) {
            return <div> JOIN A ROOM !</div>;
        } else {
            return (
                <div>
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
