import React, { useState, useEffect } from 'react';
import './App.css';
import Messages from './components/Messages';
import Input from './components/Input';
import randomName from './helper/randomName';
import randomColor from './helper/randomColor';
import randomEmoji from './helper/randomEmojis';
function App() {
    const [messages, setMessages] = useState([]);
    const [drone, setDrone] = useState();
    const [member, setMember] = useState({
        username: randomName(),
        color: randomColor(),
        emoji: randomEmoji(),
    });

    useEffect(() => {
        if (member) {
            const drone = new window.Scaledrone(
                process.env.REACT_APP_CHANNEL_ID,
                {
                    data: member,
                }
            );
            setDrone(drone);
        }
    }, [member]);

    useEffect(() => {
        if (drone) {
            drone.on('open', (error) => {
                if (error) {
                    return console.error(error);
                }
                member.id = drone.clientId;
                setMember(member);
            });
            const room = drone.subscribe('observable-room');
            room.on('data', (data, member) => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { member, text: data },
                ]);
            });
        }
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
        <div className="Chat-App">
            <div className="Header">
                <h1 className="animate-character">CHAT APP</h1>
            </div>
            <div className="App-cross"></div>
            <Messages messages={messages} currentMember={member} />
            <Input onSendMessage={onSendMessage} />
        </div>
    );
}
export default App;
