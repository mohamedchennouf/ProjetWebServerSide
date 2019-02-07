import React, { Component } from 'react';
import './App.css';
import Hobby from './Hobby';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: ['Home', 'Recipe','Aliments'],
      topRecipes: ['couscous','pâtes','unknown'],
    }
  }

  addHobby() {
    let oldHobbies = this.state.menus;
    this.setState({
      menus: oldHobbies.concat(this.input.value)
    });
  }

  removeHobby(hobby) {
    this.setState((state) => {
      const newHobbies = state.menus.filter(
        (elem, index) => {
          return (elem !== hobby) ? elem : null;
        }
      );
      return { menus: newHobbies }
    });
  }

  /*componentDidMount() {
    fetch("http://localhost:8080/API/FOODS")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }*/

  

  /*<img src="trizo.jpeg" alt="Italian Trulli" width="500" height="333"></img>
     <p>Nombre de Hobbies : {this.state.hobbies.length}</p>
     <input type="text" ref={(input) => this.input = input} />
     <button onClick={() => this.addHobby()}>Add Hobby</button>

     <ul>
       {list}
     </ul> */

  render() {

    let list = this.state.menus.map(
      (el) => 
        <button className="button">{el}</button> 
    );

    let alimentList = this.state.topRecipes.map(
      (el, index) => {
        return <div className="cardRecipe">
          <img class="cardimg" name={el} indice={index} src="resources/unknown.png" ></img>
          <div class="cardname">description</div>
        </div>
      }
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
                {list}
          </div>


          <div className="body-content">

          <div className="search">
            <div className="search-content">
              <p><span className="title-search">Find a recipe...</span></p>
              <input className="search-input" type="search"/>
              <button className="search-button">search</button>
           </div>
          </div>


          <div className="top-recipe">
            {alimentList}
          </div>

          <div className="commentary">
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
