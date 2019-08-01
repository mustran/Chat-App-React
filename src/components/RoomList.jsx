import React from "react";
import styled from "styled-components";

export default function RoomList({ subscribeToRoom, rooms, roomId }) {
    const orderedRooms = [...rooms];
    orderedRooms.sort((a, b) => {
        return a.id - b.id;
    });
    return (
        <div>
            {orderedRooms.map((room, index) => {
                const active = roomId === room.id ? "active" : "";
                return (
                    <ActiveLink key={index}>
                        <a className={active} onClick={() => subscribeToRoom(room.id)} href="#">
                            #{room.name}
                        </a>
                    </ActiveLink>
                );
            })}
        </div>
    );
}

const ActiveLink = styled.li`
    .active {
        color: red;
        background-color: blue;
    }
`;
