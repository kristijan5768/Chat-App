import React, { Component } from 'react';
import './App.css';
import Messages from './Messages';
import Input from './input';
function randomName() {
    const firstName = [
        'Alicia',
        'Donald',
        'Robert',
        'Pamela',
        'Heather',
        'Philip',
        'Mark',
        'Chrispoher',
        'Joshua',
        'Shannon',
        'Jenniger',
        'Bradley',
        'Benjamin',
        'Debbie',
        'Hannah',
        'Daniel',
        'James',
        'Jerome',
        'Debra',
        'Taylor',
    ];
    const lastName = [
        'Glass',
        'Murray',
        'Petty',
        'Gomez',
        'Davis',
        'King',
        'Contreras',
        'Woods',
        'Acosta',
        'Evans',
        'Sandoval',
        'Odom',
        'Kelly',
        'Evans',
        'Oliver',
        'Jensen',
        'Benjamin',
        'Herring',
        'Olson',
        'Hetfield',
    ];

    const firstNames = firstName[Math.floor(Math.random() * firstName.length)];
    const lastNames = lastName[Math.floor(Math.random() * lastName.length)];
    return firstNames + ' ' + lastNames;
}

function randomColor() {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
}
class App extends Component {
    constructor() {
        super();
        this.state = {
            messages: [],
            member: {
                username: randomName(),
                color: randomColor(),
            },
        };

        this.drone = new window.Scaledrone(process.env.REACT_APP_CHANNEL_ID, {
            data: this.state.member,
        });
    }

    componentDidMount() {
        this.drone.on('open', (error) => {
            if (error) {
                return console.error(error);
            }
            const member = { ...this.state.member };
            member.id = this.drone.clientId;
            this.setState({ member });
        });
        const room = this.drone.subscribe('observable-room');
        room.on('data', (data, member) => {
            const messages = this.state.messages;
            messages.push({ member, text: data });
            this.setState({ messages });
        });
    }

    onSendMessage = (message) => {
        if (message === '') {
            alert('Enter your message!!!');
        } else {
            this.drone.publish({
                room: 'observable-room',
                message,
            });
        }
    };

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h1 className="animate-character">CHAT APP</h1>
                </div>
                <div className="App-cross"></div>
                <Messages
                    messages={this.state.messages}
                    currentMember={this.state.member}
                />
                <Input onSendMessage={this.onSendMessage} />
            </div>
        );
    }
}

export default App;
