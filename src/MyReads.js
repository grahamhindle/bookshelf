import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

import {
  BrowserRouter as 
  Router, 
  Link,
  Route 
} from 'react-router-dom'

const bookshelves = [
  { shelfId:"currentlyReading", shelfName:"Currently Reading"},
  { shelfId:"wantToRead",shelfName:"Want to Read"},
  { shelfId:"Read",shelfName: "Read"},

]

class MyReads extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render() {
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="container">
          {bookshelves.map(shelf => (
            <BookShelf
              key={shelf.shelfId}
              name={shelf.shelfName}
            />
          ))}
        </div>
      </div>
    )
  }
}
export default MyReads