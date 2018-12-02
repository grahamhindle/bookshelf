import React, { Component } from "react";
import "./App.css";
import MyReads from "./MyReads";
import BookSearch from "./BookSearch";
import * as BooksAPI from "./BooksAPI";
import { Route } from "react-router-dom";
import {concat,findIndex} from 'lodash';

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
      console.log(e.message);
    }  

  }
  
  async bookSave(book, shelf) {
    //save the current state of books
    try {
      await BooksAPI.update(book, shelf);
    }
    catch (e) {
      console.log(e.message)
    }
  }

   /****************************************************
  SEARCH PATH - Query from backend server
****************************************************/
async queryResults(queryString) {
  this.setState(() => ({
    queryString: []
  }));
  this.setState(() => ({
    queryString: queryString,
  }));
  try{
    const queryResult = await BooksAPI.search(queryString)
    this.createSearchResults(queryResult);
  }
  catch(e){
    console.log(e.message)
  }

}

createSearchResults = res => {
  let newRes= []
  if (res && res.length > 0) {
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
    
    this.createSearchResults(book)
  };
x
 
  /**********************************************************
  add book from search window and update books and then
  update shelf on booksearch
************************************************************/
  bookMove = book => {
    //add book to books
    
    let newBooks = this.state.books;
    const b = findIndex(newBooks, (o=>{
        return (o.id === book.id)
    })) 
    if (b === -1){
      const c = concat(newBooks,book);
      this.setState(() => ({
        books: c
      }))
    } else {
       newBooks[b].shelf = book.shelf
       console.log(newBooks[b].shelf)
       this.setState(() => ({
        books: newBooks
      }))
    }
    
    this.bookSave(book, book.shelf);
    //update the search results with new shelf
    this.createSearchResults(book)
  }
  

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
              onChangeBookStatus={this.bookMove}
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
