import React from "react";

export default function SendMessageForm({ handleChange, value, handleSubmit}) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder="type your message and hit enter"
                />
            </form>
        </div>
    );
}
