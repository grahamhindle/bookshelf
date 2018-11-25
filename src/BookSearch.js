import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Book from "./Book";
import { Link } from "react-router-dom";
import { debounce } from 'lodash';

class BookSearch extends Component {
  constructor(props) {
    super(props);


    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookStatus: PropTypes.func.isRequired
  };


  handleChange = debounce(e => {
    this.props.queryResults(e)
    }, 250
  );

  handleSubmit(event) {
    event.preventDefault();
    this.handleChange();
  }

 
  /**********************************************************
  SEARCH PATH
  helper function to filter out books that we already have on 
  our bookshelves after initial search load 
  and set shelf status to none
  todo: change the search filter to add shelf status 
    for books already in shelf
************************************************************/

  

  onShelfChange = book => {
    this.props.bookMove(book);
  };

  render() {
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
                  onChange={e => this.handleChange(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="search-books-results">
            <div className="showing-contacts">
              {this.props.query !== "" ? (
                this.props.bookSearchResults.length === 0 ? (
                  <span>{`No results for query: ${this.props.queryString}`}</span>
                ) : (
                  <span>{`There are ${
                    this.props.bookSearchResults.length
                  } results for this Search: ${this.props.queryString}`}</span>
                )
              ) : (
                <span />
              )}
            </div>
            <ol className="books-grid">
              {this.props.bookSearchResults.map(book => (
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
