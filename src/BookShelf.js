import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import Book from './Book'
import BookShelfManager from './BookShelfManager'



class BookShelf extends Component {
  constructor(props){
    super(props)
    this.onShelfChanger = this.onShelfChanger.bind(this)
  }
  
  onShelfChanger = ((props)=> {
    this.props.changeShelf(props)
  })

  render(){
    
    const filterBooks = this.props.books.filter(book => book.shelf === this.props.shelf)
    
    return(
      
      <div className ="listbooks-content">
        <div className="bookshelf">
          <h2 className="bookshelf-title">{this.props.name}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {filterBooks.map((book)=>(
                <div>
                  <Book key = {book.id} 
                    book={book} 
                    changeShelf = {this.onShelfChanger}
                    />
                    
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}
export default BookShelf