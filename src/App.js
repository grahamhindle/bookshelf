import React, { Component } from 'react';
import './App.css';
import MyReads from './MyReads'
import BookSearch from './BookSearch'
import  * as BooksAPI from './BooksAPI'

import {
  BrowserRouter as 
  Router, 
  Link,
  Route 
} from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      books:[]
    }
    this.updateStatus = this.updateStatus.bind(this)
  }
  


 componentDidMount(){
  
  BooksAPI.getAll()
    .then((books)=>{
      this.setState(()=> ({
        books
      }))
    })
    
}

updateStatus= ((book)=>{
  //update the status in the shelf
    const newBooks = this.state.books.map(b =>{
      if ( b.id !== book.id )return b
      
      return {
        ...b,
        shelf:  book.shelf
      }
      
    })
    console.log("found it",newBooks)
    this.setState({books : newBooks})
    
    /*
    let newBook = Object.assign({}, this.state.book)
    const result = this.state.books.findIndex(id => id.id === book.id)
    newBook[result] = book
    console.log("NEWB",newBook)
    this.setState((prevState)=>({
      books[result]: prevState[result]
      console.log('prev',prevState)
    }))
    */
})
  render() {
    console.log("before render",this.state.books)
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
        onChangeBookStatus = {this.updateStatus}
          />
      )}/>
    </div>
    
    )
  }
}

export default App;
