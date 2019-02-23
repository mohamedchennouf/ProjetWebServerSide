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
      linkList: ["/", "/recipe", "/alimentList", "/shops"],
      id: "",
      password: "",
      isLoggedIn: false
    };
    this.login = this.login.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
  }


  componentDidMount() {
   console.log(this.state.isLoggedIn);
  }

  login() {
    let url = "http://localhost:8080/API/USER/CONNECT";
    fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      id: "",
      body: JSON.stringify({ data: { id: this.state.id, password: this.state.password } })
    }).then(data => {
      console.log(data);
        if(data.status=== 200){
          this.setState({ isLoggedIn: true });
        }
      }).catch(function (err) {
        console.log(err);
      });
  }

  logout() {
    this.setState({ isLoggedIn: false });
  }





  getLink(index) {
    let page = this.state.menusLinks[index];
    this.props.history.push(page);
  }

  onChangeId(event) {
    this.setState({ id: event.target.value });
  }

  onChangePass(event) {
    this.setState({ password: event.target.value });
  }

  render() {
    console.log("-------main--------");
    console.log(this.state);
    console.log("-------main--------");
    if (this.props.inside !== this.state.inside) {
      this.state.inside = this.props.inside;
    }

    let list = this.state.menus.map(
      (el, index) => <Link to={this.state.linkList[index]}>
        <button className="button" indice={index} >{el}</button>
      </Link>
    );

    let logging_register = (<div className="login">
      <div class="section1">
        <div>login</div>
        <input className="input" type="login" value={this.state.id} onChange={this.onChangeId} />
        <div>password</div>
        <input className="input" type="password" value={this.state.password} onChange={this.onChangePass} />
        <div>
          <Link to="/subscribe">SignIn</Link></div>
      </div>
      <div class="section2">
        <button onClick={this.login}>login</button>
      </div>
    </div>);

    if (this.state.isLoggedIn) {
      logging_register = (<div className="login">
        <div class="section1">
          Bonjour {this.state.id}
        </div>
        <div class="section2">
          <button onClick={this.logout}>logout</button>
        </div>
      </div>);
    }


    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <img className="imgLogo" alt="" src="resources/logo.png" />
          </div>
          <div className="titre">
            <h1> Miam Miam Eat </h1>
          </div>

          {logging_register}


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