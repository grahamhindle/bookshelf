import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import {Link} from 'react-router-dom'




const bookshelves = [
  { id:0,shelfId:"currentlyReading", shelfName:"Currently Reading"},
  { id:1,shelfId:"wantToRead",shelfName:"Want to Read"},
  { id:2,shelfId:"read",shelfName: "Read"},

]

class MyReads extends Component {
  

  onUpdate=((book)=> {
    console.log("myreads func", book)
    this.props.onChangeBookStatus(book)
  })
  render() {
    
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="container">
          {bookshelves.map(shelf => (
            <BookShelf
              key={shelf.id}
              shelf={shelf.shelfId}
              name={shelf.shelfName}
              books={this.props.books}
              changeShelf={this.onUpdate}
            />
          ))}
        </div>
          <div className="open-search">
            <Link 
              to = '/booksearch'
              >Add a book
            </Link>
          </div>
        
        
      </div>
    
    )
  }
}
export default MyReads 
