import React, { Component } from "react";
import MessageList from "./components/MessageList";
import Chatkit from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";
class App extends Component {
    state = {
        messages: []
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
    render() {
        return (
            <div className="App">
                <MessageList messages={this.state.messages}/>
            </div>
        );
    }
}

export default App;
