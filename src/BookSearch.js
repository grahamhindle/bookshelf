import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import Book from './Book'



class BookSearch extends Component {
  state = {
    searchCriteria: "",
  }

  handleSubmit = ((e)=>{
    e.preventDefault();
    //now search for books against searchCriteria

    
  })
  onShelfChanger = ((book)=> {
    
    this.props.onChangeBookStatus(book)
  })


  
  
  render() {
    
    //const url = `url(${this.props.books.imagelinks.smallThumbnail})`
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <div className="search-books">
            <div className="search-books-bar">
              <div className="search-books-input-wrapper">
              <input type="text" value={this.state.value} placeholder="Search by title or author"/>
              </div>
            </div>
          </div>  
        </form>
        <div className="search-books-results">
        <ol className="books-grid">
              {this.props.books.map((book)=>(
              <Book key = {book.id} 
                book={book} 
                changeShelf = {this.onShelfChanger}/>
            ))}
        </ol>
          
        </div>
      </div>
    )
  }
}
export default BookSearch