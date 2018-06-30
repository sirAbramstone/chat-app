import React, {Component} from 'react';

import './SendMessageForm.css';

class SendMessageForm extends Component {
    constructor(props) {
        super(props);

        this.state ={
            message: ''
        };
    }

    handleChange = e => {
      this.setState({message: e.target.value})
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.sendMessage(this.state.message);
      this.setState({message: ''})
    };

    render() {
        return (
            <form
                className="Send-message-form"
                onSubmit={this.handleSubmit}
            >
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="type your message here"
                    type="text"
                />
            </form>
        );
    }
}

export default SendMessageForm;