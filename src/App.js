import React, { Component, Fragment } from 'react';
import AddNewCard from './components/AddNewCard/AddNewCard';
import Card from './components/Card/Card';
import Notice from './components/Notice/Notice';
import Moment from 'react-moment';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.newTitle = React.createRef();
    this.newDescription = React.createRef();
    this.titleInput = React.createRef();
    this.state = {
      isLoading: true,
      isEditMode: false,
      showAlert: false,
      newTitle: '',
      newDescription: '',
      editingTitle: '',
      editingDescription: '',
      editingIdeaIndex: null,
      ideas: []
    };

    this.addIdea = this.addIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);
    this.setEdit = this.setEdit.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.saveEditedIdea = this.saveEditedIdea.bind(this);
    this.orderByNewestDate = this.orderByNewestDate.bind(this);
    this.orderAlphabetically = this.orderAlphabetically.bind(this);
  }

  // function to hide notification after a timeout
  hideNotification(){
    if(this.state.showAlert === true){
      window.setTimeout(() => {
        this.setState({
          showAlert: false
        });
      }, 2500);
    }
  }

  // function order by newest date: newer will come first.
  orderByNewestDate(){
    let ideas = this.state.ideas;
    ideas.sort((a, b) => (b.created-a.created))
    this.setState({ideas});
  }

  // function order by alphabetically: a will be first, etc...
  orderAlphabetically(){
    let ideas = this.state.ideas;
    ideas.sort((a, b) => (a.title || "").toString().localeCompare((b.title || "").toString()))
    this.setState({ideas});
  }


  // Adding new ideas only if both fields are not empty
  addIdea(e){
    let ideas = this.state.ideas;
    const title = this.state.newTitle;
    const description = this.state.newDescription;

    const idea = {
      title: title,
      description: description,
      created: Date.now()
    };

    if( title !== '' && description !== ''){
      ideas.push(idea);
      this.setState({ideas, newTitle: '', newDescription: '' });
    }

    this.newTitle.current.value = '';
    this.newDescription.current.value = '';
    this.newTitle.current.focus();

    e.preventDefault();
  }

  // Delete idea
  deleteIdea(indexToDelete){
    const filteredIdeas = this.state.ideas.filter(function (idea, index) {
      return (indexToDelete !== index);
    });

    this.setState({
      ideas: filteredIdeas
    })

  }

  // set up the editing mode in the state for both fields
  setEdit = (event, index) => {
    this.setState({
      isEditMode: true,
      editingIdeaIndex: index,
      editingTitle: this.state.ideas[index].title,
      editingDescription: this.state.ideas[index].description});
  };

  updateTitle = (event) => {
    this.setState({editingTitle: event.target.value});
  };

  updateDescription = (event) => {
    this.setState({editingDescription: event.target.value});
  };

  saveEditedIdea = (event, index) => {
    let ideas = this.state.ideas;

    ideas[index].title = this.state.editingTitle;
    ideas[index].description = this.state.editingDescription;
    ideas[index].updated = Date.now();
    this.setState({ ideas, showAlert: true, isEditMode: false, editingIdeaIndex: null, editingTitle:'', editingDescription: '' });
  };

  componentDidMount() {
    const storeIdeas = JSON.parse(localStorage.getItem('ideas'))
    if (storeIdeas) {
      this.setState(() => ({ ideas: storeIdeas, isLoading: false }));
    }
    this.newTitle.current.focus();
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem('ideas', JSON.stringify(this.state.ideas));

    this.state.ideas.forEach((idea, index) => {
      if (prevState.ideas[index] !== idea) {
        localStorage.setItem('ideas', JSON.stringify(this.state.ideas));
      }
    });

    this.hideNotification()
  }

  render() {
    const {ideas, showAlert} = this.state;
    return (
      <main className='main'>
        <header className='main-header'>
          <div className='container'>
            <h1>My Ideas Board</h1>
            <div className='filters'>
              <button className='button is-info' type='button' onClick={this.orderByNewestDate}>Order by Date</button>
              <button className='button is-info' type='button' onClick={this.orderAlphabetically}>Order Alphabetically</button>
            </div>
          </div>
        </header>
        <div className='notice-area container'>
          {
            showAlert &&
            <Notice />
          }
        </div>
        <div className="content">
          <div className='container ideas-board'>
            <AddNewCard
              newTitleRef={this.newTitle}
              newDescriptionRef={this.newDescription}
              newTitle={ideas.newTitle}
              newDescription={ideas.newDescription}
              onAddTitle={event => this.setState({ newTitle: event.target.value })}
              onAddDescription={event => this.setState({ newDescription: event.target.value })}
              onSubmit={this.addIdea} />
            {
              ideas &&
              ideas.map((idea, index) => {
                if(this.state.editingIdeaIndex === null || this.state.editingIdeaIndex !== index ){
                  return (
                    <Card key={index}>
                      <header className='card-header'>
                        <p className='card-header-title' onClick={event => this.setEdit(event, index)}>{idea.title}</p>
                      </header>
                      <div className='card-content'>
                        <div className='content'>
                          <p onClick={event => this.setEdit(event, index)}>{idea.description}</p>
                          <ul className='timestamps'>
                            <li>
                              <time><Fragment><strong>Created:</strong> <Moment format="DD/MM/YY HH:mm">{idea.created}</Moment></Fragment></time>
                            </li>
                            {
                              idea.updated &&
                              <li>
                                <time><Fragment><strong>Last edit:</strong> <Moment format="DD/MM/YY HH:mm">{idea.updated}</Moment></Fragment></time>
                              </li>
                            }
                          </ul>
                        </div>
                      </div>
                      <footer className='card-footer'>
                        <button className='button is-danger is-small' type='button' onClick={() => this.deleteIdea(index)}>Delete</button>
                      </footer>
                    </Card>
                  )
                } else{
                  return(
                    <Card key={index} extraClassNames='card--edited'>
                      <header className='card-header'>
                        <input className='input' type="text" maxLength='28' ref={this.titleInput} defaultValue={this.state.editingTitle} onChange={event => this.updateTitle(event)}/>
                      </header>
                      <div className='card-content'>
                        <div className='content'>
                          <textarea className='textarea' placeholder='description' maxLength='140' rows='5' defaultValue={this.state.editingDescription} onChange={event => this.updateDescription(event)}/>
                        </div>
                      </div>
                      <footer className='card-footer'>
                        <button className='button is-info is-small' type='button' onClick={(event) => this.saveEditedIdea(event, index)}>Save</button>
                      </footer>
                    </Card>
                  )
                }
              })
            }
          </div>
        </div>
      </main>
    );
  }
}
