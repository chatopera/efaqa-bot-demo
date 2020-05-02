/** @jsx React.DOM */

"use strict";

var ChatBox = React.createClass({
  getInitialState: function() {
    return { users: [] };
  },

  componentDidMount: function() {
    this.chatProxy = this.props.chatProxy;
    this.chatProxy.connect(this.props.payload);
    this.chatProxy.onMessage(this.addMessage.bind(this));
    this.chatProxy.onUserConnected(this.userConnected.bind(this));
    this.chatProxy.onUserDisconnected(this.userDisconnected.bind(this));
  },

  userConnected: function(user) {
    var users = this.state.users;
    users.push(user);
    this.setState({
      users: users
    });
  },

  userDisconnected: function(user) {
    var users = this.state.users;
    users.splice(users.indexOf(user), 1);
    this.setState({
      users: users
    });
  },

  messageHandler: function(message) {
    message = this.refs.messageInput.getDOMNode().value;
    this.addMessage({
      content: message,
      author: this.chatProxy.getUsername()
    });
    this.chatProxy.sendToServer({
      content: message,
      author: this.chatProxy.getUsername(),
      provider: this.props.payload
    });
  },

  addMessage: function(message) {
    if (message) {
      message.date = new Date();
      this.refs.messagesList.addMessage(message);
    }
  },

  render: function() {
    return (
      <div className="chat-box" ref="root">
        <div className="chat-header ui-widget-header">
          Chatopera Test Client
        </div>
        <div className="chat-content-wrapper row">
          <MessagesList ref="messagesList" />
          <UsersList
            users={this.state.users}
            chatProxy={this.props.chatProxy}
            ref="usersList"
          />
        </div>
        <MessageInput ref="messageInput" messageHandler={this.messageHandler} />
      </div>
    );
  }
});
