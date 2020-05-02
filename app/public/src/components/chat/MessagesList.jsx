/** @jsx React.DOM */

"use strict";

var MessagesList = React.createClass({
  getInitialState: function() {
    return { messages: [] };
  },

  addMessage: function(message) {
    var messages = this.state.messages;
    var container = this.refs.messageContainer.getDOMNode();
    messages.push(message);
    this.setState({ messages: messages });

    // Smart scrolling - when the user is
    // scrolled a little we don't want to return him back
    // if (container.scrollHeight -
    //     (container.scrollTop + container.offsetHeight) >= 50) {
    //   this.scrolled = true;
    //   console.log('msg list', 'set scrolled to true')
    // } else {
    //   console.log('msg list', 'set scrolled to false')
    //   this.scrolled = false;
    // }
  },

  componentDidUpdate: function() {
    // if (this.scrolled) {
    //   console.log('msg list', 'componentDidUpdate return')
    //   return;
    // }
    console.log("msg list", "componentDidUpdate return scroll");
    var container = this.refs.messageContainer.getDOMNode();
    container.scrollTop = container.scrollHeight;
  },

  render: function() {
    var messages;
    messages = this.state.messages.map(function(m) {
      return <ChatMessage message={m} />;
    });
    if (!messages.length) {
      messages = <div className="chat-no-messages">没有消息</div>;
    }
    return (
      <div ref="messageContainer" className="chat-messages col-xs-6">
        {messages}
      </div>
    );
  }
});
