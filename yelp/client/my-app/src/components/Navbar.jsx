import React from 'react';
import './css/App.css';

function Navbar() {
  return (
    <div className='header_wrapper'>
        <nav className="navbar sticky-top navbar-light">
                <a className="navbar-brand" href="#">
                    <img src={require("../Photos/Lamsmall.png")} width="145" height="45" className="d-inline-block align-top" alt="" />
                    <span className="gradient-text"><strong style={{color: 'white'}}><i>s</i>Logbook 2.0</strong></span>
                </a>
        </nav> 
    </div>
  )
}

export default Navbar