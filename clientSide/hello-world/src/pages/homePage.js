import React, { Component } from 'react';
import MainFrame from './MainFrame';
import './homePage.css';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      topRecipes: ['couscous','pâtes','unknown'],
      imgTopRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
    }
  }

  getImage(index){
    return this.state.imgTopRecipes[index];
  }

  render() {

    let alimentList = this.state.topRecipes.map(
      (el, index) => {
        return <div className="cardRecipe">
          <img className="cardimg" name={el} indice={index} src={this.getImage(index)} ></img>
          <div className="cardname">description</div>
        </div>
      }
    );

    let insideContent = <div className="body-content">
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

    return (
      <MainFrame inside = {insideContent}></MainFrame>
    );

  }


}

export default HomePage;
