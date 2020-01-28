import React, { Component } from 'react';

class NoteEditor extends Component {

  render() {

    return (
      <form className="note-editor" onSubmit={this.props.updateNote}>
        <input type="text" name="title" value={this.props.title} onChange={this.props.onTextChange}/>
        <textarea name="body" value={this.props.body} onChange={this.props.onTextChange}/>
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button onClick={this.props.onCancel} type="button">Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
