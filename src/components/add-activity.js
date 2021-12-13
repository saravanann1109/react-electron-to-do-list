import React from "react";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
const toastOptions = { type: 'error' };

const AddActivity = ({ add }) => {
    const [text, setText] = useState("");

    const addAcitivy = (value) => {
        if (value === '' || value === undefined) {
            toast('Enter the task to be added.', toastOptions);
            return;
        }
        add(value);
        setText("");
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13 || e.charCode === 13) {
            e.preventDefault();
            addAcitivy(text);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className="ui action input">
                <input type="text" onChange={e => setText(e.target.value)} value={text} onKeyPress={handleKeypress} placeholder="Enter the activity to be complete today" />
                <button className="ui teal button" onClick={() => { addAcitivy(text); }}>Add</button>
            </div>
        </div>
    );
};

export default AddActivity;