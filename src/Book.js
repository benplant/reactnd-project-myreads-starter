import React, { Component } from 'react'
import BookshelfChanger from './BookshelfChanger'

class Book extends Component {
  render () {
    console.log('Props', this.props)
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.url})` }}></div>
          <BookshelfChanger />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.author}</div>
      </div>
    )
  }
}

export default Book
