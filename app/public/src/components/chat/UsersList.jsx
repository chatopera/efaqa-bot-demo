/** @jsx React.DOM */
"use strict";

var UsersList = React.createClass({
  getInitialState: function() {
    return {
      response: this.props.response || {}
    };
  },

  refreshServerResponseData: function(data) {
    console.log("onServerResponseUpdate", data);
    this.editor.setValue(JSON.stringify(data || {}, null, "\t"));
  },

  componentDidMount: function() {
    var self = this;
    const node = self.refs.aceEidtor.getDOMNode();
    self.editor = ace.edit(node);
    self.editor = ace.edit(node);
    self.editor.setTheme("ace/theme/clouds");
    self.editor.getSession().setMode("ace/mode/json");
    self.editor.getSession().setTabSize(2);
    self.editor.getSession().setUseWrapMode(true);
    self.editor.setShowPrintMargin(false);
    self.editor.setOptions({ minLines: 10 });
    self.editor.setOptions({ maxLines: 100 });
    self.editor.setValue(JSON.stringify(self.state.response, null, "\t"));
    self.props.chatProxy.onServerResponseUpdate(
      this.refreshServerResponseData.bind(this)
    );
  },

  render: function() {
    const style = {
      fontSize: "14px !important",
      border: "1px solid lightgray"
    };

    return (
      <div className="users-list col-xs-6">
        <div ref="aceEidtor" style={style} />
      </div>
    );
  }
});
