import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  static propTypes = {
    currentShelf: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {value: this.props.currentShelf};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    alert('You want to move the book to: ' + this.state.value);
    this.setState({value: event.target.value});
  }

  render () {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default BookshelfChanger
