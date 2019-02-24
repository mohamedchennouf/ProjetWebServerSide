import React, { Component } from 'react';
import './MainFrame.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import settings from './../settings';


class MainFrame extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inside: props.inside,
      menus: ['Home', 'Recipe', 'Aliments', "Shops"],
      topRecipes: [],
      linkList: ["/", "/recipe", "/alimentList", "/shops"],
      id: "",
      password: "",
      connected: false
    };
    this.login = this.login.bind(this);
    this.onChangeId = this.onChangeId.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
  }


  componentDidMount() {
  }

  login() {
    fetch(settings.url+ "API/USER/CONNECT", {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      id: "",
      body: JSON.stringify({ data: { id: this.state.id, password: this.state.password } })
    }).then(data => {
      if (data.status === 200) {
        console.log(data);
        this.setState({connected: true});
      }
    }).catch(function (err) {
      console.error(err);
    });
  }

  logout = function () {
    var cookie = new Cookies(null);
    cookie.remove('connect');
    cookie.remove('mail')
    this.setState({connected: false});
  }.bind(this);





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

    

    var cookie = new Cookies(null)



    if (this.props.inside !== this.state.inside) {
      this.state.inside = this.props.inside;
    }

    let list = this.state.menus.map(
      (el, index) => <Link to={this.state.linkList[index]}>
        <button className="button" indice={index} >{el}</button>
      </Link>
    );

    let logging_register = null;

    console.log("ok momo")
    console.log(cookie)

    if (cookie.get('connect') != null) {
      logging_register = (<div className="login">
        <div className="section1">
          Bonjour {cookie.get('mail')}
        </div>
        <div className="section2">
          <button onClick={this.logout}>logout</button>
        </div>
      </div>);
    }else{
      logging_register = (<div className="login">
      <div className="section1">
        <div>login</div>
        <input className="input" type="login" value={this.state.id} onChange={this.onChangeId} />
        <div>password</div>
        <input className="input" type="password" value={this.state.password} onChange={this.onChangePass} />
        <div>
          <button onClick={this.login}>login</button>
          or <Link to="/subscribe">SignIn</Link></div>
      </div>
    </div>)
    }



    return (
      <div className="App">
        <div className="header">
          <div className="logo">
            <Link to="/">
              <img className="imgLogo" alt="" src="resources/logo.png" />
            </Link>
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