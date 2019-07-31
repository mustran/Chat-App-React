import React, { Component } from "react";
import Chatkit from "@pusher/chatkit-client";
import { tokenUrl, instanceLocator } from "./config";
class App extends Component {
    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: "musli",
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        });

        chatManager.connect()
        .then(currentUser => {
            currentUser.subscribeToRoom({
                roomId: "31264558",
                hooks: {
                    onMessage: message => {
                        console.log("message.text " , message.text, currentUser.rooms);
                    }
                },
                // messageLimit: 0
            });
            console.log("Connected as user ", currentUser)
        });
    }

    render() {
        return <div className="App">test push</div>;
    }
}

export default App;
