import React from 'react';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBooks from './SearchBooks';
import Bookshelf from './Bookshelf';
import './App.css';

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
    console.log('UpdateBook');
    console.log(book);
    console.log(newShelf);
    BooksAPI.update(book, newShelf);
    book.shelf = newShelf;

    // Add book to current state if not already present
    if (this.state.books.indexOf(book) < 0) {
      this.setState(state => ({
          books: state.books.concat([ book ])
      }))
    } else {
      this.setState(this.state)
    }
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

      <Route path="/search" render={() => (
        <SearchBooks
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
                <Bookshelf
                  title="Currently Reading"
                  books={books.filter(b => b.shelf === "currentlyReading")}
                  onChangeShelf={this.updateBook.bind(this)}
                />
                <Bookshelf
                  title="Want to Read"
                  books={books.filter(b => b.shelf === "wantToRead")}
                  onChangeShelf={this.updateBook.bind(this)}
                />
                <Bookshelf
                  title="Read"
                  books={books.filter(b => b.shelf === "read")}
                  onChangeShelf={this.updateBook.bind(this)}
                />
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
