import React, { Component } from 'react';
import './recipePage.css';
import MainFrame from './MainFrame';

class recipePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList : ["Couscous","Pâtes","Unknown"],
     // menusList : ["Couscous"],
      imgMenusRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
     // imgMenusRecipes: ['resources/couscous.png'],
     stringMenusText: ["je fait du couscous avec toutes la famille","j'aime les banane","Wat"]
    }
  }

  newRecipe(newMenu,newImg,newText){
    this.state.menusList.push(newMenu);
    this.state.imgMenusRecipes.push(newImg);
    this.state.stringMenusText.push(newText);
  }

  getImage(index){
    return this.state.imgMenusRecipes[index];
  }

  getText(index){
    return this.state.stringMenusText[index];
  }

  render() {

    let recipeBlockList = this.state.menusList.map(
      (el, index) => {
        return <div className="recipeLineBlock">
          <img className="imgRecipe" name={el} indice={index} alt="" src={this.getImage(index)} ></img>
          <div className="textRecipe"> 
            {this.getText(index)}
          </div>
        </div>
      }
    );

    let insideContent = 
    <div className="body-content">
    <div>
      {recipeBlockList}
    </div>
    </div>

    return (
      <MainFrame inside = {insideContent}></MainFrame>
    );
  }


}

export default recipePage;
