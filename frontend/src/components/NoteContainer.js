import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {
  state = {
    notes: [],
    clickedNote: null,
    edit: false,
    body: null,
    title: null,
    searchTerm: ''
  }


  componentDidMount(){
    fetch('http://localhost:3000/api/v1/notes')
    .then(res => res.json())
    .then(notes => this.setState({
      notes: notes
    }))
  }


  updateNote = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/api/v1/notes/${this.state.clickedNote.id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        body: this.state.body,
        title: this.state.title,
        user: { id: this.state.clickedNote.user.id }
      })
    })
    .then(res => res.json())
    .then(noteToAdd => {
      const filteredNotes = this.state.notes.filter(note => note.id !== this.state.clickedNote.id)
      this.setState({
        notes: [noteToAdd, ...filteredNotes],
        clickedNote: null,
        edit: false,
        body: null,
        title: null
      })
    })
  }


  onCancel = () => {
    this.setState({
      edit: false,
    })
  }


  onNew = (e) => {
    e.preventDefault()

    fetch(`http://localhost:3000/api/v1/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        body: 'test',
        title: 'test',
        user: { id: 1 }
      })
    })
    .then(res => res.json())
    .then(noteToAdd => {
      this.setState({
        notes: [noteToAdd, ...this.state.notes],
        clickedNote: null,
        edit: false,
        body: null,
        title: null
      })
    })
  }


  selectNote = (note) => {
    this.setState({
      clickedNote: note,
      body: note.body,
      title: note.title,
      edit: false
    })
  }


  onEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }


  onTextChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  render() {
    console.log(this.state.searchTerm)
    const filteredNotes = (this.state.searchTerm === '') ? this.state.notes : this.state.notes.filter(note => note.title.toLowerCase().includes(this.state.searchTerm) || note.body.toLowerCase().includes(this.state.searchTerm))
    return (
      <Fragment>
        <Search onTextChange={this.onTextChange}/>
        <div className='container'>
          <Sidebar notes={filteredNotes} selectNote={this.selectNote}  onNew={this.onNew}/>
          <Content note={this.state.clickedNote} edit={this.state.edit} onEdit={this.onEdit} onTextChange={this.onTextChange} title={this.state.title} body={this.state.body} updateNote={this.updateNote} onCancel={this.onCancel} new={this.state.new}/>
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
