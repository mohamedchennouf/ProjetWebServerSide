import React, { Component } from 'react';
import './recipePage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import settings from './../settings';

class recipePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList: [],
      imgMenusRecipes: [],
      connected: true
    }
  }


  componentDidMount() {
    this.getRecipe()
  }


  getRecipe() {
    fetch(settings.url+'API/RECETTES?res=50')
      .then(response => response.json())
      .then(data => {
        var myData = data;
        myData.forEach(function (element) {
          element.urlImg = settings.url+'API/image/' + element._id;
        });
        this.setState({ menusList: myData });
      })
      .catch(e => console.error(e));
  }

  newRecipe(newMenu, newImg, newText) {
    this.state.menusList.push(newMenu);
    this.state.imgMenusRecipes.push(newImg);
    this.state.stringMenusText.push(newText);
  }

  getImage(index) {
    return this.state.imgMenusRecipes[index];
  }

  urlCreatorDetail(el){
    return "/recipeDetails?" + el;
  }


  render() {
    let recipeBlockList = this.state.menusList.map(
      (el, index) => {
        return <Link to={this.urlCreatorDetail(el.title)}>
          <div className="recipeLineBlock">
            <img className="imgRecipe" name={el} indice={index} alt="" src={el.urlImg} ></img>
            <div className="textRecipe">
              <div> <span className="titleChamp"> Name : </span>{el.title}</div>
              <div> <span className="titleChamp"> Description: </span> {el.content}</div>
            </div>
          </div>
        </Link>
      }
    );

    let insideContent = null;

    if (this.state.connected) {
      insideContent =
        <div className="body-content">
          <div>
            <Link to="/addNewRecipe">
              <div className="addNewRecipe">
                Add New Recipe
            </div>
            </Link>

            {recipeBlockList}
          </div>
        </div>

    } else {
      insideContent =
        <div className="body-content">
          <div>
            {recipeBlockList}
          </div>
        </div>
    }

    return (
      <MainFrame inside={insideContent}></MainFrame>
    );
  }


}

export default recipePage;
