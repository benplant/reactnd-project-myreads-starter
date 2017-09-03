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
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log(books)
    })
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">

      <Route path="/search" render={() => (
        <SearchBooks />
      )}/>

      <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <Bookshelf title="Currently Reading" books={books.filter(b => b.shelf === "currentlyReading")} />
                <Bookshelf title="Want to Read" books={books.filter(b => b.shelf === "wantToRead")} />
                <Bookshelf title="Read" books={books.filter(b => b.shelf === "read")} />
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
