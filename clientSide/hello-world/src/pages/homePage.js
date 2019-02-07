import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import './homePage.css';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menus: ['Home', 'Recipe','Aliments'],
      topRecipes: ['couscous','pâtes','unknown'],
      imgTopRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
      menusLinks:['/new','/home','/home']
    }
  }

  getLink(index){
    let page = this.state.menusLinks[index];
    console.log(page);
    this.props.history.push(page);
  }

  getImage(index){
    return this.state.imgTopRecipes[index];
  }

  render() {

    let list = this.state.menus.map(
      (el,index) => 
    <button className="button" indice={index}>{el}</button> 
    );

    let alimentList = this.state.topRecipes.map(
      (el, index) => {
        return <div className="cardRecipe">
          <img className="cardimg" name={el} indice={index} src={this.getImage(index)} ></img>
          <div className="cardname">description</div>
        </div>
      }
    );

    return (
      <div className="HomePage">


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

export default HomePage;
