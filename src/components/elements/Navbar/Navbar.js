import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = props => {
  return (
    <div className='rmdb-navigation'>
      <div className='rmdb-navigation-content'>
        <Link to='/'>
          <p>Home</p>
        </Link>
        <p>/</p>

        <p>{props.movie}</p>
      </div>
    </div>
  );
};

export default Navbar;
