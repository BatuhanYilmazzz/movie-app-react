import React from 'react';
import { calcTime, convertMoney } from '../../../helpers.js';
import './MovieInfoBar.css';

const MovieInfoBar = props => {
  return (
    <div className='rmdb-movieinfobar'>
      <div className='rmdb-movieinfobar-content'>
        <div className='rmdb-movieinfobar-col'>
          <i className='far fa-clock'></i>{' '}
          <span className='rmdb-movieinfobar-info'>
            Running time :{calcTime(props.time)}
          </span>
        </div>
        <div className='rmdb-movieinfobar-col'>
          <span className='rmdb-movieinfobar-info'>
            Budget: {convertMoney(props.budget)}
          </span>
        </div>
        <div className='rmdb-movieinfobar-col'>
          <i className='fas fa-money-bill-wave'></i>{' '}
          <span className='rmdb-movieinfobar-info'>
            Revenue:{convertMoney(props.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoBar;
