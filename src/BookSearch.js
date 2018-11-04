import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import Book from './Book'

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookStatus: PropTypes.func.isRequired,
  }
  
    
  handleSubmit = ((e)=>{
    e.preventDefault();
    //in App Component
    this.props.getQueryResults()

  })
    
updateQuery=((query)=>{
  this.props.updateQuery(query)
})
  
  onShelfChange = ((book)=> {
    this.props.onChangeBookStatus(book)
  })

  

  render() {

     
    return (
      <div>
        <form onSubmit = {this.handleSubmit}>
          <div className="search-books">
            <div className="search-books-bar">
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
              
              {this.props.query !== ''? this.props.searchResults.length  === 0 ? 
              <span>{`No results for query: ${this.props.query}`}</span> :
              <span>{`There are ${this.props.searchResults.length} results for this Search: ${this.props.query}` }</span>
              : <span></span>}
          </div>
          <ol className="books-grid">
                {this.props.searchResults.map((book)=>(
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