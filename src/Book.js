import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import BookShelfManager from './BookShelfManager'

class Book extends Component {
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
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ width: 128, height: 193, 
              backgroundImage:`url(${book.imageLinks.thumbnail})`}}>
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