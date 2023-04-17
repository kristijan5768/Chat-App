import React, { useState } from 'react';

function Input(props) {
    const [text, setText] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [showError, setShowError] = useState(false);

    const onChange = (e) => {
        const text = e.target.value;
        const charCount = text.length;
        const showError = charCount > 120;
        setText(text);
        setCharCount(charCount);
        setShowError(showError);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (charCount <= 120) {
            props.onSendMessage(text);
            setText('');
            setCharCount(0);
            setShowError(false);
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="Input">
            <form onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    value={text}
                    type="text"
                    placeholder="Enter your message and press ENTER!"
                    autoFocus={true}
                    maxLength="121"
                />
                <button className="button">Send</button>
            </form>
            {showError && (
                <div className="error">
                    Character limit exceeded!(Max. characters per message 120)
                </div>
            )}
        </div>
    );
}

export default Input;
