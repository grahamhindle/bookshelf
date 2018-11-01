import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'
import BookShelfManager from './BookShelfManager'

class Book extends Component {
  
  
  render(){
    
    
    const url = `url(${this.props.list.url})`
    console.log('props',this.props)
    const shelfId = this.props.key
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ width: 128, height: 193, 
              backgroundImage: url}}>
            </div>
            <BookShelfManager shelfID={shelfId} status={this.props.shelf} />
          </div>
        </div>
      </li>
    )
  }
}
export default Book