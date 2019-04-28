import React, { Component } from "react";
import PropTypes from 'prop-types';

class AddNewCard extends Component {
  render() {
    return (
      <div className='card add-new-idea'>
        <header className='card-header'>
          <input className='input' placeholder="Title for your idea" maxLength='28' ref={this.props.newTitleRef} type='text' value={this.props.newTitle} onChange={this.props.onAddTitle} />
        </header>
        <div className='card-content'>
          <div className='content'>
            <textarea className='textarea' placeholder='Describe your idea' maxLength='140' rows='5' ref={this.props.newDescriptionRef} value={this.props.newDescription} onChange={this.props.onAddDescription}/>
          </div>
        </div>
        <footer className='card-footer'>
          <button className='button is-primary' type="submit" onClick={this.props.onSubmit}>Add Idea</button>
        </footer>
      </div>
    );
  }
}

AddNewCard.propTypes = {
  onSubmit: PropTypes.func,
  onAddTitle: PropTypes.func,
  onAddDescription: PropTypes.func,
  newTitle: PropTypes.string,
  newDescription: PropTypes.string
}



export default AddNewCard;
