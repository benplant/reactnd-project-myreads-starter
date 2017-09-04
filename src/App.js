import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import Bookshelf from './Bookshelf';
import './App.css';

const bookshelves = [
  {
    title: "Currently Reading",
    shelf: "currentlyReading"
  },
  {
    title: "Want to Read",
    shelf: "wantToRead"
  },
  {
    title: "Read",
    shelf: "read"
  }
];

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.updateBooks();
  }

  updateBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook(book, newShelf) {
    BooksAPI.update(book, newShelf);

    const matchingBook = this.state.books.filter(b => b.id === book.id)
    if  (!matchingBook[0]) {
      book.shelf = newShelf;
      this.setState(state => ({
          books: state.books.concat([ book ])
      }))
    } else {
      matchingBook[0].shelf = newShelf;
      this.setState(this.state)
    }
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

      <Route path="/search" render={() => (
        <SearchBooks
          currentBooks={books}
          onChangeShelf={this.updateBook.bind(this)}
        />
      )}/>

      <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookshelves.map((bookshelf, index) => (
                  <Bookshelf
                    key={index}
                    title={bookshelf.title}
                    books={books.filter(b => b.shelf === `${bookshelf.shelf}`)}
                    onChangeShelf={this.updateBook.bind(this)}
                  />
                ))}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
