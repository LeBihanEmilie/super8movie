import React, { Component } from 'react'

class SearchBar extends Component{
  constructor(props){
    super(props);
      this.state = { 
        searchText:'',
         placeHolder:'Tapez votre film...',
         intervalBeforeRequest: 1000,
         lockRequest: false,
  }
}

handleChange(e){
  this.setState({searchText:event.target.value});
  //si le verrou n'est pas fermé, donc s'il est ouvert
  if(!this.state.lockRequest){
    //on met bien notre state à jour
    this.setState({lockRequest: true})
    setTimeout(function(){this.search()}.bind(this),this.state.intervalBeforeRequest)
  }
}

handleOnClick(event){
  search()
}

search(){
  this.props.callback(this.state.searchText);
  this.setState({lockRequest: false})
}

  render(){
    return (
      <div className="row">
        <div className="col-lg-8 input-group">
          <input onChange= {this.handleChange.bind(this)} type="text" className="form-control input-lg"  placeholder={this.state.placeHolder}/>
          <span className="input-group-btn">
          <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}>Go!</button>
          </span>
        </div>
      </div>
    )
  }
}

export default SearchBar;