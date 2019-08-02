import React from "react";
import styled from "styled-components";

export default function NewRoomForm({ handleChangeRoom, value, handleSubmit }) {
    return (
        <div>
            <NewRoom onSubmit={handleSubmit}>
                <input
                    onFocus={e => (e.target.placeholder = "")}
                    onBlur={e => (e.target.placeholder = "CREATE NEW ROOM!")}
                    onChange={handleChangeRoom}
                    value={value}
                    type="text"
                    placeholder="CREATE NEW ROOM!"
                    required
                />
            </NewRoom>
        </div>
    );
}

const NewRoom = styled.form`
    input {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        border: 0;
        margin: 0;
        font-size: 25px;
        text-align: center;
        border: 1px solid black;
        ::placeholder {
            color: orange;
            font-size: 20px;
            padding: 10px;
        }

        :focus {
            background-color: aliceblue;
        }

        :disabled{
            background-color: grey;
        }
    }
`;
