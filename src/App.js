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
      searchResults :[],
      query:''
    }
    this.updateStatus = this.updateStatus.bind(this)
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
  MYREADS PATH
  change the status of a book / move the shelf it is
  on
  ***************************************************/
  
  updateStatus= ((book)=>{
    //update the status in the shelf
    const newBooks = this.state.books.map(b =>{
      if ( b.id !== book.id )return b
        return {
          ...b,
          shelf:  book.shelf
        }
      
    })

      
      this.setState({books : newBooks})
      
      BooksAPI.update(book,book.shelf)
        .then((books)=>{
        this.setState({
        books : newBooks
      })   
    })
    
  })

  /*************************************************
   SEARCH PATH - update the query string
   *************************************************/
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    }))
  }
  
  /**********************************************************
  SEARCH PATH
  after the searchResults shelf key has been changed
  ************************************************************/  
  updateQueriedStatus = ((book)=>{
    this.state.searchResults.map(b =>{
      if ( b.id === 'none' )
        return b    
      return {
        ...b,
        shelf:  book.shelf
      }
    })
  })
/**********************************************************
  SEARCH PATH
  move book from search window and update books
  ************************************************************/
  bookMove = ((book)=>{
    //add book to books
    const newBooks = this.state.books
    newBooks.concat(book)
    this.setState(()=> ({
      searchResults: newBooks
    }))
    this.updateStatus(book)
    
    
    
  })
  /**********************************************************
  SEARCH PATH
  helper function to filter out books that we already have on 
  our bookshelves after initial search load
  ************************************************************/  
  createSearchResults = ((res)=> {
    console.log("csr1",res)
    if(res.length > 0 ){
      //is the book already in our shelves ?
      const newBooks = res
      .filter(o => !this.state.books
      .find(o2 => o.id === o2.id))
      
      newBooks.map(book => book.shelf = "none")
      console.log("newBooks2",newBooks)
      this.setState(()=> ({
        searchResults: newBooks
      }))
    }
    else {
      this.setState(()=> ({
        searchResults: []
      }))
    }
  })

  /****************************************************
  SEARCH PATH - Query from backend server
  ****************************************************/
  queryResults=(()=>{
    BooksAPI.search(this.state.query)
    .then((queryResult )=>{
     this.createSearchResults(queryResult) 
    })
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
          searchResults={this.state.searchResults}
          getQueryResults={this.queryResults}
          query={this.state.query}
          updateQuery = {this.updateQuery}
          onChangeBookStatus = {this.bookMove}
          />
      )}/>
    </div>
    )
  }
}

export default App;
