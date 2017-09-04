import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    if (this.props.currentShelf) {
      this.state = {bookShelf: this.props.currentShelf};
    } else {
      this.state = {bookShelf: 'none'};
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const newShelf = event.target.value
    this.setState({bookShelf: newShelf});
    this.props.onChangeShelf(this.props.book, newShelf);
  }

  render () {
    return (
      <div className="book-shelf-changer">
        <select value={this.state.bookShelf} onChange={this.handleChange}>
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
