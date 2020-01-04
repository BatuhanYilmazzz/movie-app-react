import React, { Component } from 'react';
import './SearchBar.css';
/*import FontAwesome from 'react-fontawesome';*/

class SearchBar extends Component {
  state = {
    value: ''
  };

  setSearch = e => {
    this.setState({ value: e.target.value });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500);
  };

  render() {
    return (
      <div className='rmdb-searchbar'>
        <div className='rmdb-searchbar-content'>
          <i className='fas fa-search fa-2x rmdb-fa-search'></i>
          <input
            type='text'
            placeholder='Search'
            className='rmdb-searchbar-input'
            onChange={this.setSearch}
            value={this.value}
          />
        </div>
      </div>
    );
  }
}
export default SearchBar;
