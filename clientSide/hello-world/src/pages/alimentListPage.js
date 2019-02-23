import React, { Component } from 'react';
import './alimentListPage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class alimentListPage extends Component {



  constructor(props) {
    super(props);
    this.state = {
      menusList : ["jusdespermdeXavier","Pâtes","Unknown"],
     // menusList : ["Couscous"],
      imgMenusRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
     // imgMenusRecipes: ['resources/couscous.png'],
     stringMenusText: ["commentary1","commentary2","commentary3"]
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

  onSubmit(image,element){
    console.log(image);
    console.log(element);
    localStorage.setItem("image",image);
    localStorage.setItem("name",element);
  }

  urlCreator(input){
    return "/aliments?" + input;
  }

  render() {

    let recipeBlockList = this.state.menusList.map(
      (el, index) => {
        return <div>
            <Link to={this.urlCreator(el)}>
        <button className="alimentListLineBlock" onClick={this.onSubmit.bind(this,this.getImage(index),el)}>
          <img className="imgAlimentList" name={el} indice={index} alt="" src={this.getImage(index)}></img>
          <div className="textAlimentList"> 
            {this.getText(index)}
          </div>
        </button>
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
