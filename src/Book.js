import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookshelfChanger from './BookshelfChanger';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  updateShelf(newShelf) {
    this.props.onChangeShelf(this.props.book, newShelf);
  }

  render () {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <BookshelfChanger
            currentShelf={book.shelf}
            onChangeShelf={this.updateShelf.bind(this)}
          />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors != null && book.authors.join(", ")}</div>
      </div>
    )
  }
}

export default Book
