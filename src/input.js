import React, { Component } from 'react';

class Input extends Component {
    state = {
        text: '',
        charCount: 0,
        showError: false,
    };

    onChange = (e) => {
        const text = e.target.value;
        const charCount = text.length;
        const showError = charCount > 120;
        this.setState({ text, charCount, showError });
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.charCount <= 120) {
            this.props.onSendMessage(this.state.text);
            this.setState({ text: '', charCount: 0, showError: false });
        } else {
            this.setState({ showError: true });
        }
    };

    render() {
        return (
            <div className="Input">
                <form onSubmit={this.onSubmit}>
                    <input
                        onChange={this.onChange}
                        value={this.state.text}
                        type="text"
                        placeholder="Enter your message and press ENTER!"
                        autoFocus={true}
                        maxLength="121"
                    />
                    <button className="button">Send</button>
                </form>
                {this.state.showError && (
                    <div className="error">
                        Character limit exceeded!(Max. characters per message
                        120)
                    </div>
                )}
            </div>
        );
    }
}

export default Input;
