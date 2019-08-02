import React from "react";
import styled from "styled-components";

export default function RoomList({ subscribeToRoom, rooms, roomId }) {
    const orderedRooms = [...rooms];
    orderedRooms.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
    });
    return (
        <div>
            {orderedRooms.map((room, index) => {
                const active = roomId === room.id ? "active" : "";
                return (
                    <ActiveLink key={index}>
                        <a className={active} onClick={() => subscribeToRoom(room.id)} href="#">
                            # {room.name}
                        </a>
                    </ActiveLink>
                );
            })}
        </div>
    );
}

const ActiveLink = styled.li`
    list-style: none;
    font-size: 20px;
    padding: 3px;
    font-weight: bold;
    a {
        color: white;
        text-decoration: none;
    }
    .active {
        color: rgba(0,0,0,0.4);
        /* background-color: blue; */
    }
    a:hover{
        color: rgba(0,0,0,0.8);
    }
`;
