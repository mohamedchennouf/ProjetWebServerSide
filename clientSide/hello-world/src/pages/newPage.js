import React, { Component } from 'react';
import './newPage.css';
import MainFrame from './MainFrame';
class newPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList : ["Aliment1","Aliment2","Aliment3"] 
    }
  }


  render() {

    let insideContent = <div></div>
    return (
      <MainFrame inside = {insideContent}></MainFrame>
    );
  }


}

export default newPage;
