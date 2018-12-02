import React, {Component} from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Book from './Book';
import {Link} from 'react-router-dom';
import {debounce} from 'lodash';

class BookSearch extends Component {
  constructor (props) {
    super (props);

    this.handleSubmit = this.handleSubmit.bind (this);
    this.handleChange = this.handleChange.bind (this);
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
  };

  handleChange = debounce (e => {
    this.props.queryResults (e);
  }, 250);

  handleSubmit (event) {
    event.preventDefault ();
    this.handleChange ();
  }

  onShelfChange = book => {
    this.props.bookMove (book);
  };

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="search-books">
            <div className="search-books-bar">
              <Link to="/" className="close-search">
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  ref={input => (this.search = input)}
                  placeholder="Search by title or author"
                  onChange={e => this.handleChange (e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.props.bookSearchResults.map (book => (
                <Book
                  key={book.id}
                  book={book}
                  changeShelf={this.onShelfChange}
                />
              ))}
            </ol>
          </div>
        </form>
      </div>
    );
  }
}
export default BookSearch;
