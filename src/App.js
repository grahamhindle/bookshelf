import React, { Component } from "react";
import "./App.css";
import MyReads from "./MyReads";
import BookSearch from "./BookSearch";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  async componentDidMount() {
    //get ther initial books data
   
    try{
      const books = await BooksAPI.getAll();
      this.setState({ books });
    }
    catch (e) {
      alert(" Mount",e.name);
    }  

  }
  
  async bookSave(book, shelf) {
    //save the current state of books
    try {
      await BooksAPI.update(book, shelf);
    }
    catch (e) {
      alert(e.name)
    }
  }

  /**************************************************
  Update Book PATH
  change the status of a book / move the shelf it is
  on
  ***************************************************/

  updateStatus = book => {
    //update the status in the shelf
    let newBooks = this.state.books.map(b => {
      if (b.id !== book.id) return b;
      this.bookSave(book, book.shelf);
      return {
        ...b,
        shelf: book.shelf
      };
    });
    //filter out the books that have status of none in bookshelf
    //and update state
    newBooks = newBooks.filter(b => b.shelf !== "none");
    this.setState(() => ({
      books: newBooks
    }));
  };

  /**********************************************************
  add book from search window and update books
************************************************************/
  bookMove = book => {
    //add book to books
    let newBooks = this.state.books;
    let c = newBooks.concat(book);
    this.setState(() => ({
      books: c
    }));
    this.bookSave(book, book.shelf);
  };

  /********************************************************
   render
  *********************************************************/
  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <MyReads
              books={this.state.books}
              onChangeBookStatus={this.updateStatus}
            />
          )}
        />
        <Route
          path="/booksearch"
          render={() => (
            <BookSearch
              books={this.state.books}
              bookMove={this.bookMove}
              onChangeBookStatus={this.bookMove}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
