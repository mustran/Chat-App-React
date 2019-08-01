import React from "react";

export default function NewRoomForm({ handleChangeRoom, value, handleSubmit }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChangeRoom}
                    value={value}
                    type="text"
                    placeholder="create new room"
                    required
                />
                <button type="submit">ENTER</button>
            </form>
        </div>
    );
}
