import React, { Component } from 'react';
import './App.css';
import MyReads from './MyReads'
import BookSearch from './BookSearch'
import  * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      books:[],
    }
  }
  
  componentDidMount(){
   //get ther initial books data
    BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=> ({
        books
      }))
    })
  } 

  
  /**************************************************
  Update Book PATH
  change the status of a book / move the shelf it is
  on
  ***************************************************/
  
  updateStatus= ((book)=>{
    //update the status in the shelf
    let newBooks = this.state.books.map(b =>{
      if ( b.id !== book.id )return b
        return {
          ...b,
          shelf :  book.shelf 
        } 
    }) 
    //filter out the books that have status of none in bookshelf
    //and update state
    newBooks = newBooks.filter(b => b.shelf !== 'none')
    this.setState(()=> ({
      books: newBooks
    }))
    
  })

 
/**********************************************************
  add book from search window and update books
************************************************************/
  bookMove = ((book)=>{
    //add book to books
    console.log('app.js',book.shelf)
    let newBooks = this.state.books
    let c = newBooks.concat(book) 
    this.setState(()=> ({
      books: c
    }))
  })
  
  /********************************************************
   render
  *********************************************************/
  render() {
    return(
    <div>
      <Route exact path = '/' render={() => (
        <MyReads
          books={this.state.books}
          onChangeBookStatus = {this.updateStatus}
        />
      )}/>
      <Route path = '/booksearch' render={()=>(
        <BookSearch
          books={this.state.books}
          bookMove = {this.bookMove}
          onChangeBookStatus = {this.bookMove}
          />
      )}/>
    </div>
    )
  }
}

export default App;
