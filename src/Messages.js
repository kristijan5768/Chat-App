import React, { useState, useEffect } from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import dayjs from 'dayjs';

function useMessageTimestamps(messages) {
    const [messageTimestamps, setMessageTimestamps] = useState({});

    useEffect(() => {
        messages.forEach((message, index) => {
            if (!messageTimestamps[index]) {
                setMessageTimestamps((prevState) => {
                    return {
                        ...prevState,
                        [index]: dayjs(message.timestamp),
                    };
                });
            }
        });
    }, [messages, messageTimestamps]);

    return messageTimestamps;
}

function Messages(props) {
    const messageTimestamps = useMessageTimestamps(props.messages);

    const renderMessage = (message, index) => {
        const { member, text, timestamp } = message;
        const { currentMember } = props;
        const messageFromMe = member.id === currentMember.id;
        const className = messageFromMe
            ? 'Messages-message currentMember'
            : 'Messages-message';

        const messageTime = messageTimestamps[index]
            ? messageTimestamps[index].format('HH:mm:ss DD.MM')
            : dayjs(timestamp).format('HH:mm:ss DD.MM');

        return (
            <li className={className} key={index}>
                <span className="avatar" />
                <div className="Message-content">
                    <div className="username">
                        {member.clientData.username}
                        {member.clientData.emoji}
                    </div>
                    <div className="text">{text}</div>
                    <div className="timestamp">{messageTime}</div>
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
