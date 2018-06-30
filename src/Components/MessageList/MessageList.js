import React from 'react';

import './MessageList.css';

const MessageList = ({messages}) => (
    <ul className="Message-list">
        {messages.map(message => (
            <li
                key={message.id}
                className="Message"
            >
                <div>
                    {message.senderId}
                </div>
                <div>
                    {message.text}
                </div>
            </li>
        ))}
    </ul>
);

export default MessageList;