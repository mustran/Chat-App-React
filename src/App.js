import React, { Component } from "react";
import MessageList from "./components/MessageList";
import styled from "styled-components";
import SendeMessageForm from "./components/SendMessageForm";
import Chatkit from "@pusher/chatkit-client";
import RoomList from "./components/RoomList";
import { tokenUrl, instanceLocator } from "./config";
import NewRoomForm from "./components/NewRoomForm";
class App extends Component {
    state = {
        messages: [],
        message: "",
        joinableRooms: [],
        joinedRooms: [],
        roomId: null,
        newRoomName: "",
        disable: true,
        usersWhoAreTyping: []
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
            console.log(this.currentUser.rooms);
            this.getRooms();
            // console.log("Connected as user ", currentUser);
        });

        console.log("COMPONENT DID MOUNT");
    }

    getRooms = () => {
        this.currentUser.getJoinableRooms().then(joinableRooms => {
            this.setState({
                joinableRooms,
                joinedRooms: this.currentUser.rooms
            });
        });
    };

    subscribeToRoom = id => {
        this.setState({
            messages: [],
            disable: false
        });
        // console.log(id);
        this.currentUser
            .subscribeToRoom({
                roomId: id,
                hooks: {
                    onMessage: message => {
                        // console.log("message.text ", message.text, currentUser.rooms);
                        this.setState({
                            messages: [...this.state.messages, message]
                        });
                    },
                    onUserStartedTyping: user => {
                        this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name]
                        });
                    }
                }

                // messageLimit: 0
            })
            .then(room => {
                this.setState({
                    roomId: room.id
                });
                this.getRooms();
            })
            .catch(err => console.log(err));
    };

    sendMessage = text => {
        this.currentUser.sendMessage({
            text,
            roomId: this.state.roomId
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
            message: ""
        });
        // console.log(this.state.message);
    };

    handleSubmitRoom = e => {
        e.preventDefault();
        // console.log(this.state.newRoomName);
        this.createRoom(this.state.newRoomName);
        this.setState({
            newRoomName: ""
        });
    };

    handleChangeRoom = e => {
        this.setState({
            newRoomName: e.target.value
        });
    };

    createRoom = name => {
        this.currentUser
            .createRoom({
                name
            })
            .then(room => this.subscribeToRoom(room.id));
    };

    render() {
        return (
            <AppWrapper style={{ height: "100%" }}>
                <div className="container">
                    {/* <div style={{overflow: "hidden", width: "100%", height: "100%"}}> */}
                        <MessageList disabled={this.state.disable} messages={this.state.messages} />
                    {/* </div> */}
                    <div className="senderForm">
                        <SendeMessageForm
                            isTyping={this.isTyping}
                            disabled={this.state.disable}
                            handleSubmit={this.handleSubmit}
                            handleChange={this.handleChange}
                            value={this.state.message}
                        />
                    </div>
                    <div className="roomList">
                        <RoomList
                            roomId={this.state.roomId}
                            subscribeToRoom={this.subscribeToRoom}
                            rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                        />
                    </div>
                    <div className="newRoom">
                        <NewRoomForm
                            handleChangeRoom={this.handleChangeRoom}
                            value={this.state.newRoomName}
                            handleSubmit={this.handleSubmitRoom}
                        />
                    </div>
                </div>
            </AppWrapper>
        );
    }
}

const AppWrapper = styled.div`
    .container {
        display: grid;
        width: 100%;
        height: 100%;
        grid-template-areas:
            "messages  messages messages messages messages pages"
            "messages  messages messages messages messages pages"
            "messages  messages messages messages messages pages"
            "messages  messages messages messages messages pages"
            "messages  messages messages messages messages pages"
            "newMessage  newMessage newMessage newMessage newMessage newRoom";
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: 1fr 1fr 1fr 1fr 1fr 60px;
    }

    .roomList {
        grid-area: pages;
        background-color: lightblue;
    }

    .messageList {
        overflow: scroll;
        height: 100%;
        grid-area: messages;
        margin-left: 5px;
        /* background-color: #ffa08c; */
        /* border-radius: 5px; */
    }

    .senderForm {
        grid-area: newMessage;
        background-color: #2cffa0;
        position: relative;
    }
    .newRoom {
        position: relative;
        grid-area: newRoom;
        background-color: #8cffa0;
    }
`;

export default App;
