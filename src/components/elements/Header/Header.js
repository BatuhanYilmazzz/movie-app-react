import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='rmdb-header'>
      <div className='rmdb-header-content'>
        <Link to='/'>
          <i className='fas fa-film fa-5x'></i>
        </Link>
      </div>
    </div>
  );
};

export default Header;
