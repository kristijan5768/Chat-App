import React, { Component } from 'react';

class Messages extends Component {
    render() {
        const { messages } = this.props;
        return (
            <ul className="Messages-list">
                {messages.map((message, index) =>
                    this.renderMessage(message, index)
                )}
            </ul>
        );
    }

    renderMessage(message, index) {
        const { member, text } = message;
        const { currentMember } = this.props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
            ? 'Messages-message currentMember'
            : 'Messages-message';
        //const emoji = this.getRandomEmoji();
        return (
            <li className={className} key={index}>
                <span className="avatar" />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                        {member.clientData.emoji}
                        {/*{emoji}*/}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    }
}

export default Messages;
