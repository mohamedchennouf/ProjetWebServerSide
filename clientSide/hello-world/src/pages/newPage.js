import React, { Component } from 'react';
import './newPage.css';

class newPage extends Component {


  state = {
      menus: ['Home', 'Recipe','Aliments']};

  render() {

    let list = this.state.menus.map(
      (el) => 
        <button className="button">{el}</button> 
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

export default newPage;
