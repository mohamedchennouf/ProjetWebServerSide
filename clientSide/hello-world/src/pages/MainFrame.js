import React, { Component } from 'react';
import './MainFrame.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class MainFrame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inside: props.inside,
      menus: ['Home', 'Recipe', 'Aliments', "Shops"],
      topRecipes: ['couscous', 'pâtes', 'unknown'],
      linkList: ["/", "/recipe", "/alimentList", "/shops"]
    }
  }



   



  getLink(index) {
    let page = this.state.menusLinks[index];
    this.props.history.push(page);
  }

  render() {


    function login(e){
      console.log("login")
    }

    if (this.props.inside !== this.state.inside) {
      this.state.inside = this.props.inside;
    }

    let list = this.state.menus.map(
      (el, index) => <Link to={this.state.linkList[index]}>
        <button className="button" indice={index} >{el}</button>
      </Link>
    );

    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <img className="imgLogo" alt="" src="resources/logo.png" />
          </div>
          <div className="titre">
            <h1> Miam Miam Eat </h1>
          </div>
          <div className="login">

            <div class="section1">
              <div>login</div>
              <input className="input" type="login" />
              <div>password</div>
              <input className="input" type="password" />

              <div>
                <Link to="/subscribe">SignIn</Link></div>
            </div>

            <div class="section2">
              <button onClick={login}>login</button>
            </div>

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