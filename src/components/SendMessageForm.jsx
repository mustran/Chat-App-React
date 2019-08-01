import React from "react";

export default function SendMessageForm({ disabled, handleChange, value, handleSubmit}) {

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                disabled={disabled}
                    onChange={handleChange}
                    value={value}
                    type="text"
                    placeholder="type your message and hit enter"
                />
            </form>
        </div>
    );
}
