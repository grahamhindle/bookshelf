import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import BookShelfManager from './BookShelfManager'

class Book extends Component {
  constructor(props){
    super(props)
    this.state = {
      book:[],
    }
    this.updateBookStatus = this.updateBookStatus.bind(this)
  }
  
  
  componentDidMount(){
    
    this.setState(()=>({
      book: this.props.book
    }))
  }
      
    

  updateBookStatus=((value)=>{
    console.log("ubs",value)
    let newBook = Object.assign({}, this.state.book)
    
    newBook.shelf = value
    console.log("newBook",newBook)
    this.setState({newBook})

    this.props.changeShelf(newBook)
    
  })

  render(){
    
    const book = this.props.book;
    const {book2} =this.state.book
    console.log("book",this.props)
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ width: 128, height: 193, 
              backgroundImage:`url(${this.props.book.imageLinks.thumbnail})`}}>
            </div>
            <BookShelfManager 
                      key = {book.shelf.name}
                      book = {this.props.book} 
                      onUpdate = {this.updateBookStatus}
                      />
          </div>
        </div>
        <div className="book-title">{this.state.book.title}</div>
        <div className="book-authors">{this.state.book.authors}</div>
      </li>
    )
  }
}
export default Book