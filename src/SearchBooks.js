import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchBooks extends Component {
  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.updateBooks()
  }

  updateBooks = () => {
    BooksAPI.search(this.state.query, 20).then((books) => {
      this.setState({ books })
    })
  }

  checkForShelf = (book) => {
    const matchingBook = this.props.currentBooks.filter(b => b.id === book.id)
    if (matchingBook[0]) {
      book.shelf = matchingBook[0].shelf;
    } else {
      book.shelf = 'none';
    }
  }

  render () {
    const { books, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            { books &&
              books.map((book) => (
              <li key={book.id}>
                { this.checkForShelf(book) }
                <Book
                  book={book}
                  onChangeShelf={this.props.onChangeShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
