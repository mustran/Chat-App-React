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
        disable: true
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
            this.getRooms();
            // console.log("Connected as user ", currentUser);
        });
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
            <AppWrapper>
                <div className="container">
                    <MessageList disabled={this.state.disable} messages={this.state.messages} />
                    <SendeMessageForm
                        disabled={this.state.disable}
                        handleSubmit={this.handleSubmit}
                        handleChange={this.handleChange}
                        value={this.state.message}
                    />
                    <RoomList
                        roomId={this.state.roomId}
                        subscribeToRoom={this.subscribeToRoom}
                        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
                    />
                    <NewRoomForm
                        handleChangeRoom={this.handleChangeRoom}
                        value={this.state.newRoomName}
                        handleSubmit={this.handleSubmitRoom}
                    />
                </div>
            </AppWrapper>
        );
    }
}

const AppWrapper = styled.div`
    .container {
        display: grid;
        grid-auto-flow: column;
    }
`;

export default App;
