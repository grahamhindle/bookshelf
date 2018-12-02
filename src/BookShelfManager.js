import React,{Component} from 'react'
import './App.css';
import PropTypes from 'prop-types'

class BookShelfManager extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
  }
  state = {
    value:"currentlyReading"
  }
    
  static getDerivedStateFromProps(nextProps,prevState) {
    
    return nextProps.shelf === prevState.shelf
      ? {} : {value: nextProps.shelf}
    
  }

  handleChange = ((e)=>{
    this.setState({value: e.target.value});
    this.props.onUpdate(e.target.value)
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