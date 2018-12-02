import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
  static propTypes = {
    shelf: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
  };
  /*******************************************
   * book has changed shelf
   ******************************************/
  onShelfChange = props => {
    this.props.changeShelf (props);
  };
  /*******************************************
   * render the bookshelves
   ******************************************/
  render () {
    const filterBooks = this.props.books.filter (
      book => book.shelf === this.props.shelf
    );
    return (
      <div className="listbooks-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {filterBooks.map (book => (
                <Book
                  key={book.id}
                  book={book}
                  changeShelf={this.onShelfChange}
                />
              ))}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
export default BookShelf;
