import React from "react";

export default function RoomList({subscribeToRoom, rooms }) {
    return (
        <div>
            {rooms.map((room, index) => {
                return (
                    <li key={index}>
                        <a onClick={()=>subscribeToRoom(room.id)} href="#">#{room.name}</a>
                    </li>
                );
            })}
        </div>
    );
}
