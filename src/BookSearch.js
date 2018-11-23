import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import Book from "./Book";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString: "",
      bookSearchResults: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookStatus: PropTypes.func.isRequired
  };

  handleChange = () => {
    this.setState({ bookSearchResults: [] });
    this.setState({ queryString: this.search.value }, () => {
      if (this.state.queryString.length > 0) {
        this.queryResults();
      }
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    this.handleChange();
  }

  /****************************************************
  SEARCH PATH - Query from backend server
****************************************************/
  queryResults = () => {
    BooksAPI.search(this.state.queryString).then(queryResult => {
      this.createSearchResults(queryResult);
    });
  };

  /**********************************************************
  SEARCH PATH
  helper function to filter out books that we already have on 
  our bookshelves after initial search load 
  and set shelf status to none
  todo: change the search filter to add shelf status 
    for books already in shelf
************************************************************/

  createSearchResults = res => {
    let newRes= []
    if (res.length > 0) {
      newRes = res.map((val) => {
        const b = this.props.books.findIndex(id => id.id === val.id)
          if (b >= 0 ){ 
            val.shelf = this.props.books[b].shelf
          }else{
            val.shelf = 'none'
          }
         return val
      });
      this.setState(() => ({
        bookSearchResults: newRes,
      }));
    } else {
      this.setState(() => ({
        bookSearchResults: []
      }));
    }
  };

  onShelfChange = book => {
    this.bookMove(book);
  };

  /**********************************************************
  SEARCH PATH
  move book from search window and update books
  ************************************************************/
  bookMove = book => {
    //add book to books
    this.props.bookMove(book);
    //remove from querylist
    const newSearchList = this.state.bookSearchResults.filter(
      b => b.id !== book.id
    );
    this.setState(() => ({
      bookSearchResults: newSearchList
    }));
  };

  render() {
    const { bookSearchResults, queryString } = this.state;
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
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </div>
          <div className="search-books-results">
            <div className="showing-contacts">
              {this.props.query !== "" ? (
                bookSearchResults.length === 0 ? (
                  <span>{`No results for query: ${queryString}`}</span>
                ) : (
                  <span>{`There are ${
                    bookSearchResults.length
                  } results for this Search: ${queryString}`}</span>
                )
              ) : (
                <span />
              )}
            </div>
            <ol className="books-grid">
              {bookSearchResults.map(book => (
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
