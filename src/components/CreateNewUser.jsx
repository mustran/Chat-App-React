import React from "react";

export default function CreateNewUser({ handleSubmit, value, handleChangeUser }) {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChangeUser}
                    value={value}
                    type="text"
                    placeholder="create new user"
                    required
                />
            </form>
        </div>
    );
}
