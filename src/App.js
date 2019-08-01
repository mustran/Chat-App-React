import React, { Component } from "react";
import MessageList from "./components/MessageList";
import styled from "styled-components";
import SendeMessageForm from "./components/SendMessageForm";
import Chatkit from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";
class App extends Component {
    state = {
        messages: [],
        message: ""
    };

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: "musli",
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        });

        chatManager.connect().then(currentUser => {
            this.currentUser = currentUser;
            currentUser.subscribeToRoom({
                roomId: "31264558",
                hooks: {
                    onMessage: message => {
                        console.log("message.text ", message.text, currentUser.rooms);
                        this.setState(
                            {
                                messages: [...this.state.messages, message]
                            },
                            () => console.log(this.state.messages)
                        );
                    }
                }
                // messageLimit: 0
            });
            console.log("Connected as user ", currentUser);
        });
    }

    sendMessage = text => {
        this.currentUser.sendMessage({
            text,
            roomId: "31264558"
        });
    };

    handleChange = e => {
        this.setState({
            message: e.target.value
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.sendMessage(this.state.message);
        this.setState({
          message: ''
        })
        console.log(this.state.message);
    };

    render() {
        return (
            <AppWrapper>
                <div className="container">
                    <MessageList messages={this.state.messages} />
                    <SendeMessageForm
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        value={this.state.message}
                    />
                </div>
            </AppWrapper>
        );
    }
}

const AppWrapper = styled.div`
    .container {
        /* display: grid;
        grid-auto-flow: column; */
    }
`;

export default App;
