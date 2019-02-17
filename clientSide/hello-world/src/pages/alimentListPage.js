import React, { Component } from 'react';
import './alimentListPage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class alimentListPage extends Component {

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
        return <div>
            <Link to="/aliments">
        <div className="alimentListLineBlock">
          <img className="imgAlimentList" name={el} indice={index} alt="" src={this.getImage(index)}></img>
          <div className="textAlimentList"> 
            {this.getText(index)}
          </div>
        </div>
        </Link>
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

export default alimentListPage;
