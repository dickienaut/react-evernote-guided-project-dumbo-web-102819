import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

/*
  Advice: If you cannot figure out how to get this component to work,
          move the div and renderContent up into NoteContainer and
          try to get it to work in the parent first.
          Then complete the rest of your app before attempting to
          refactor to get this Content component to work.
*/
class Content extends Component {
  renderContent = () => {
    if (this.props.edit) {
      return <NoteEditor note={this.props.note} title={this.props.title} body={this.props.body} onTextChange={this.props.onTextChange} updateNote={this.props.updateNote} onCancel={this.props.onCancel}/>;

    } else if (this.props.body) {
      return <NoteViewer onEdit={this.props.onEdit} title={this.props.title} body={this.props.body}/>;

    } else if (this.props.new) {
      return <NoteEditor title={this.props.title} body={this.props.body} onTextChange={this.props.onTextChange} submitNote={this.props.submitNote} onCancel={this.props.onCancel}/>

    } else {
      return <Instructions />;
    }
  }
  render() {

    return (
      <div className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
