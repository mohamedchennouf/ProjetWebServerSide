import React, { Component } from 'react';
import './recipePage.css';
import MainFrame from './MainFrame';

class recipePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList : [{title:"Couscous",content:"je fait du couscous avec toutes la famille"},{title:"Pâtes",content:"j'aime les banane"},{title:"Gatan",content:"Whar"}],
      imgMenusRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
    }
  }


  componentDidMount() {
    this.getRecipe()
  }

  getRecipe() {
    fetch('http://localhost:8080/API/RECETTES')
      .then(response => response.json())
      .then(data => {
        this.setState({ menusList: data });
        console.log(this.state.menusList)

      })
      .catch(e => console.log(e));
  }

  newRecipe(newMenu,newImg,newText){
    this.state.menusList.push(newMenu);
    this.state.imgMenusRecipes.push(newImg);
    this.state.stringMenusText.push(newText);
  }

  getImage(index){
    return this.state.imgMenusRecipes[index];
  }


  render() {

    let recipeBlockList = this.state.menusList.map(
      (el, index) => {
        return <div className="recipeLineBlock">
          <img className="imgRecipe" name={el} indice={index} alt="" src={this.getImage(index)} ></img>
          <div className="textRecipe"> 
            <div>{el.title}</div>
            <div>{el.content}</div>
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
