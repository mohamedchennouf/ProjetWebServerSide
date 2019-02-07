import React, { Component } from 'react';
import './App.css';
import Hobby from './Hobby';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hobbies: ['Croque-monsieur', 'Couscous','Riz contonais'],
    }
  }

  addHobby() {
    let oldHobbies = this.state.hobbies;
    this.setState({
      hobbies: oldHobbies.concat(this.input.value)
    });
  }

  removeHobby(hobby) {
    this.setState((state) => {
      const newHobbies = state.hobbies.filter(
        (elem, index) => {
          return (elem !== hobby) ? elem : null;
        }
      );
      return { hobbies: newHobbies }
    });
  }

  /*<img src="trizo.jpeg" alt="Italian Trulli" width="500" height="333"></img>
     <p>Nombre de Hobbies : {this.state.hobbies.length}</p>
     <input type="text" ref={(input) => this.input = input} />
     <button onClick={() => this.addHobby()}>Add Hobby</button>

     <ul>
       {list}
     </ul> */

  render() {

    let list = this.state.hobbies.map(
      (el, index) => {
        const liStyle = {
          color: (el % 2) ? 'green' : 'purple'
        }
        return <Hobby name={el} indice={index} removeHobby={this.removeHobby.bind(this)} />
      }
    );

    return (
      <div className="App">


        <div className="header">
          <div className="logo">
            <img className="imgLogo" src="/resources/logo.png" />
          </div>
          <div className="titre">
            <h1> Miam Miam Eat </h1>
          </div>
          <div className="login">
            <div>
              login
                </div>
            <input className="input" type="login" />
            <div>
              password
                </div>
            <input className="input" type="password" />
          </div>
        </div>

        
        <div className="row">

          <div className="menu-content">
            <div className="menu">
              <ul className="list-group">
                {list}
              </ul>
            </div>
          </div>


          <div className="body-content">

          <div className="search">
            <div className="search-content">
              <p><span className="title-search">Find a recipe...</span></p>
              <input className="search-input" type="search"/>
              <button className="search-button">search</button>
           </div>
          </div>

          <div class="commentary">
                    Retrouvez sur notre site des recettes de cuisine faciles pour réussir à tous les coups en cuisine !
                    Les recettes sont commentées et notées pour toutes les cuisines. Echangez vos recettes, donnez votre avis et progressez en cuisine.
          </div>

          </div>
        </div>       

      </div>
    );

  }


}

export default App;
