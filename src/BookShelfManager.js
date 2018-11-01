import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'

class BookShelfManager extends Component {
  constructor(props){
    super(props)
    this.state = {value:'currentlyReading'}
  }

  componentDidMount() {
    // get shelf the book is on and 
    //set the option in the menu
    
      this.setState({value: this.props.shelfId 
      })
      console.log('didmount',this.state.value)
  }
  handleChange = ((e)=>{
    this.setState({value: e.target.value});
  })
  render() {
    return(
      <div className="book-shelf-changer">
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}
export default BookShelfManager