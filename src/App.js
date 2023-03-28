import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import Messages from './Messages';
import Input from './input';
import { firstName, lastName } from './components/names';
import { emojis } from './components/emoji';

function randomName() {
    const firstNames = firstName[Math.floor(Math.random() * firstName.length)];
    const lastNames = lastName[Math.floor(Math.random() * lastName.length)];
    return firstNames + ' ' + lastNames;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}

function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * emojis.length);
    return emojis[randomIndex];
}

function App() {
    const [messages, setMessages] = useState([]);
    const [member, setMember] = useState({
        username: randomName(),
        color: randomColor(),
        emoji: getRandomEmoji(),
    });

    const drone = useMemo(() => {
        return new window.Scaledrone(process.env.REACT_APP_CHANNEL_ID, {
            data: member,
        });
    }, [member]);

    useEffect(() => {
        drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }
            const updatedMember = { ...member };
            updatedMember.id = drone.clientId;
            setMember(updatedMember);
        });
        const room = drone.subscribe('observable-room');
        room.on('data', (data, member) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { member, text: data },
            ]);
        });
    }, [drone, member]);

    const onSendMessage = (message) => {
        if (message.trim() === '') {
            alert('Enter your message!!!');
        } else {
            drone.publish({
                room: 'observable-room',
                message,
            });
        }
    };

    return (
        <div className="App">
            <div className="App-header">
                <h1 className="animate-character">CHAT APP</h1>
            </div>
            <div className="App-cross"></div>
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
        </div>
    );
}

export default App;
