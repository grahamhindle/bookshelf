import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import Book from './Book'
import {Link} from 'react-router-dom'

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookStatus: PropTypes.func.isRequired,
    getQueryResults: PropTypes.func.isRequired,
    updateQuery: PropTypes.func.isRequired,
  }
  
  handleSubmit = ((e)=>{
    e.preventDefault();
    this.props.getQueryResults()
  })
    
  updateQuery=((query)=>{
    this.props.updateQuery(query)
  })
    
  onShelfChange = ((book)=> {
    this.props.onChangeBookStatus(book)
    })

  render() {
    const {query, searchResults}= this.props;
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <div className="search-books">
            <div className="search-books-bar">
            <Link to = '/' className = "close-search">
              Close
            </Link>
              <div className="search-books-input-wrapper">
              <input type="text" 
                value={this.props.query} 
                placeholder="Search by title or author"
                onChange = {(event) => this.updateQuery(event.target.value)}/>
              </div>
            </div>
          </div>  
          <div className="search-books-results">
            <div className="showing-contacts">
              {this.props.query !== ''? searchResults.length  === 0 ? 
              <span>{`No results for query: ${query}`}</span> :
              <span>{`There are ${searchResults.length} results for this Search: ${query}` }</span>
              : <span></span>}
          </div>
          <ol className="books-grid">
                {searchResults.map((book)=>(
                <Book key = {book.id} 
                  book={book} 
                  updateQuery={this.updateQuery}
                  changeShelf = {this.onShelfChange}/>
              ))}
          </ol>
          </div>
        </form>
      </div>
      
    )
  }
}
export default BookSearch