import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit';

import Title from '../Title/Title';
import MessageList from '../MessageList/MessageList';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import './App.css';

const instanceLocator = "v1:us1:9f93c8c6-bea8-46a6-a841-b82a241c51ec";
const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9f93c8c6-bea8-46a6-a841-b82a241c51ec/token";
const username = "sirabramstone";
const roomId = 10456112;

const DUMMY_DATA = [
    {
        senderId: "perborgen",
        text: "who'll win?"
    },
    {
        senderId: "janedoe",
        text: "who'll win?"
    }
];

class App extends Component {
    constructor() {
        super();

        this.state = {
            messages: DUMMY_DATA
        };
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.TokenProvider({
                url: testToken
            })
        });

        chatManager.connect().then(currentUser => {
            this.currentUser = currentUser;
            this.currentUser.subscribeToRoom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
                        this.setState(prevState => {
                            return {messages: [...prevState.messages, message]};
                        })
                    }
                }
            })
        })
    }

    sendMessage = text => {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        });
    };

    render() {
        return (
            <div className="App">
                <Title/>
                <MessageList messages={this.state.messages}/>
                <SendMessageForm sendMessage={this.sendMessage}/>
            </div>
        );
    }
}

export default App;
