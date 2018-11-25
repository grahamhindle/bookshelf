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
      books: [],
      bookSearchResults: [],
      queryString: "",

    };
    this.queryResults = this.queryResults.bind(this);
  }

  async componentDidMount() {
    //get ther initial books data
   
    try{
      const books = await BooksAPI.getAll();
      this.setState({ books });
    }
    catch (e) {
      alert(" Mount",e.message);
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

   /****************************************************
  SEARCH PATH - Query from backend server
****************************************************/
async queryResults(queryString) {
  this.setState({ bookSearchResults: [] })
  this.setState({ queryString: queryString })
  console.log(this.state.queryString)
  const queryResult = await BooksAPI.search(this.state.queryString)
  this.createSearchResults(queryResult);
}

createSearchResults = res => {
  let newRes= []
  if (res.length > 0) {
    newRes = res.map((val) => {
      const b = this.state.books.findIndex(id => id.id === val.id)
        if (b >= 0 ){ 
          val.shelf = this.state.books[b].shelf
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
          path="/Search"
          render={() => (
            <BookSearch
              books={this.state.books}
              bookSearchResults = {this.state.bookSearchResults}
              bookMove={this.bookMove}
              onChangeBookStatus={this.searchBookMove}
              queryResults = {this.queryResults}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
