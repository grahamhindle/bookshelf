import React,{PureComponent } from 'react'
import './App.css';
import PropTypes from 'prop-types'
import BookShelfManager from './BookShelfManager'
import { get } from 'lodash';
import * as url from './icons/noimage.jpeg';
class Book extends PureComponent {
  static propTypes ={
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }
  state = {
    book:[],
  }

  componentDidMount(){ 
    this.setState(()=>({
      book: this.props.book
    }))
  }
      
  updateBookStatus=((value)=>{
    let newBook = Object.assign({}, this.state.book)
    newBook.shelf = value
    this.setState({newBook})
    this.props.changeShelf(newBook)
  })

  render(){
    const book = this.props.book
    let bookImage = ''
   
    bookImage = get(book,'imageLinks.thumbnail')
    if (bookImage === undefined) {
      bookImage = url
    }
    
    const bookStyle = {
      width: 128,
      height: 193,
      backgroundImage: "url(" + bookImage + ")"
    }
     
    
    
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={bookStyle}>
            </div>
            <BookShelfManager 
              key = {book.shelf}
              shelf={book.shelf}
              book = {book} 
              onUpdate = {this.updateBookStatus}
            />
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </li>
    )
  }
}
export default Book