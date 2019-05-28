import React, { Component } from 'react'

class Header extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="header">
          <h1 className="title">Super Movie</h1> 
          <img src={icon} alt="icon"/>
         
      </div>
    )
  }
}

export default Header;