import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';

function Messages(props) {
    const renderMessage = (message, index) => {
        const { member, text } = message;
        const { currentMember } = props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
            ? 'Messages-message currentMember'
            : 'Messages-message';

        return (
            <li className={className} key={index}>
                <span className="avatar" />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                        {member.clientData.emoji}
                    </div>
                    <div className="text">{text}</div>
                </div>
            </li>
        );
    };

    const { messages } = props;

    return (
        <ScrollableFeed className="Messages-list">
            <ul>
                {messages.map((message, index) =>
                    renderMessage(message, index)
                )}
            </ul>
        </ScrollableFeed>
    );
}

export default Messages;
