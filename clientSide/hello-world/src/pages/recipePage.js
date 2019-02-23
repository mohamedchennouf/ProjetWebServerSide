import React, { Component } from 'react';
import './recipePage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class recipePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList: [{ title: "Couscous", content: "je fait du couscous avec toutes la famille" }, { title: "Pâtes", content: "j'aime les banane" }, { title: "Gatan", content: "Whar" }],
      imgMenusRecipes: ['resources/couscous.png', 'resources/pâte.png', 'resources/unknown.png'],
      connected: true
    }
  }


  componentDidMount() {
    this.getRecipe()
  }
  
  

  getRecipe() {
    fetch('http://localhost:8080/API/RECETTES?res=50')
      .then(response => response.json())
      .then(data => {
        var myData = data;
        myData.forEach(function (element) {
          element.urlImg = 'http://localhost:8080/API/image/' + element._id;
        });
        this.setState({ menusList: myData });
      })
      .catch(e => console.log(e));
  }

  newRecipe(newMenu, newImg, newText) {
    this.state.menusList.push(newMenu);
    this.state.imgMenusRecipes.push(newImg);
    this.state.stringMenusText.push(newText);
  }

  getImage(index) {
    return this.state.imgMenusRecipes[index];
  }

  addNewRecipe() {
    console.log("zzzooss");
  }


  render() {
    console.log(this.state);

    let recipeBlockList = this.state.menusList.map(
      (el, index) => {
        return <div className="recipeLineBlock">
          <img className="imgRecipe" name={el} indice={index} alt="" src={el.urlImg} ></img>
          <div className="textRecipe">
            <div> <span className="titleChamp"> Name : </span>{el.title}</div>
            <div> <span className="titleChamp"> Description: </span> {el.content}</div>
          </div>
        </div>
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
