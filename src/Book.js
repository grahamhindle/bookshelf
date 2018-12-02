import React, {PureComponent} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import BookShelfManager from './BookShelfManager';
import {get} from 'lodash';

class Book extends PureComponent {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };
  state = {
    book: [],
  };

  componentDidMount () {
    this.setState (() => ({
      book: this.props.book,
    }));
  }

  updateBookStatus = value => {
    let newBook = Object.assign ({}, this.state.book);
    newBook.shelf = value;
    this.setState ({newBook});
    this.props.changeShelf (newBook);
  };

  render () {
    const book = this.props.book;

    let bookImage = '';
    const bookStyle = {};
    bookImage = get (book, 'imageLinks.thumbnail');
    bookStyle.width = 128;
    bookStyle.height = 193;
    if (bookImage === undefined) {
      bookStyle.backgroundImage = 'none';
    } else {
      bookStyle.backgroundImage = 'url(' + bookImage + ')';
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookStyle} />
            <BookShelfManager
              key={book.shelf}
              shelf={book.shelf}
              book={book}
              onUpdate={this.updateBookStatus}
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </li>
    );
  }
}
export default Book;
