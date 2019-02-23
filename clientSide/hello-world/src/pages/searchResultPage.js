import React, { Component } from 'react';
import './searchResultPage.css';
import MainFrame from './MainFrame';
class searchPage extends Component {

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

  urlParser(){
    var frst = (window.location.href).split("?");
    var res = frst[1].split("&");
    return res[0];
  }

  componentDidMount() {
    this.searchFoodFetch()
  }

  searchFoodFetch(){
    let url = "http://localhost:8080/API/RECETTE/SEARCH";
    fetch(url, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body:JSON.stringify({'title' : this.urlParser()})
    })
    .then(res => console.log(res))
    .then(res => res.job())
    .then(res => console.log(res))
    .catch(function (err) {
        console.log(err);
    });
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

    let alimentBlockList = this.state.menusList.map(
      (el, index) => {
        return <div className="alimentLineBlock">
          <img className="imgAliment" name={el} indice={index} alt="" src={this.getImage(index)} ></img>
          <div className="textAliment"> 
            {this.getText(index)}
          </div>
        </div>
      }
    );

    let insideContent = 
    <div className="body-content">
    <div>
      {alimentBlockList}
    </div>
    </div>

    return (
      <MainFrame inside = {insideContent}></MainFrame>
    );
  }


}

export default searchPage;
