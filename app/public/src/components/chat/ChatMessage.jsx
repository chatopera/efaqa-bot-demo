/** @jsx React.DOM */
"use strict";
var ChatMessage = React.createClass({
  getRawMarkup() {
    var md = new Remarkable({
      html: true
    });
    return { __html: md.render(this.props.message.content) };
  },

  render: function() {
    var msg = this.props.message;
    var hours = msg.date.getHours();
    var minutes = msg.date.getMinutes();
    hours = hours < 9 ? "0" + hours : hours;
    minutes = minutes < 9 ? "0" + minutes : minutes;
    return (
      <div className="chat-message">
        <div className="message-time">[{hours + ":" + minutes}]</div>
        <div className="message-author">&lt;{msg.author}&gt;</div>
        <div
          className="message-content"
          dangerouslySetInnerHTML={this.getRawMarkup()}
        />
        {/*md.render()*/}
      </div>
    );
  }
});
