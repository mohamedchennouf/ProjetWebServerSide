import React, { Component } from 'react';
import './MainFrame.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';

class MainFrame extends Component {

  constructor(props) {
    super(props);
    console.log(props.inside);
    this.state = {
      inside : props.inside,
      menus: ['Home', 'Recipe','Aliments'],
      topRecipes: ['couscous','pâtes','unknown'],
      linkList: ["/","/new","/"]
    }
  }


  getLink(index){
    let page = this.state.menusLinks[index];
    console.log(page);
    this.props.history.push(page);
  }

  render() {

    let list = this.state.menus.map(
      (el,index) => <Link to={this.state.linkList[index]}>
        <button className="button" indice={index} >{el}</button> 
        </Link>
    );

     return (  
        <div className="App">
          <div className="header">
            <div className="logo">
              <img className="imgLogo" src="resources/logo.png" />
            </div>
            <div className="titre">
              <h1> Miam Miam Eat </h1>
            </div>
            <div className="login">
              <div>login</div>
              <input className="input" type="login"/>
              <div>password</div>
              <input className="input" type="password" />
              <div>or <Link to="/subscribe">SignIn</Link></div>
            </div>
          </div>
        <div className="row">
          <div className="menu-content">
                {list}
          </div>
          {this.state.inside}
        </div>       
      </div>
        );

   }
  }
 
   export default MainFrame;