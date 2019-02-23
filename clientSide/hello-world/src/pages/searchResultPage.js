import React, { Component } from 'react';
import './searchResultPage.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MainFrame from './MainFrame';
class searchPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList : [],
     // menusList : ["Couscous"],
      imgMenusRecipes: [],
     // imgMenusRecipes: ['resources/couscous.png'],
     stringMenusText: []
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
    let url = "http://localhost:8080/API/RECETTES/SEARCH";
    fetch(url, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body:JSON.stringify({'title' : this.urlParser()})
    })
    .then(res => res.json())
    //.then(res => console.log(res))
    .then(res => this.stateParse(res))
    .catch(function (err) {
        console.log(err);
    });
}

  stateParse(res){
    console.log(res.length)
    if(res.length == 0){

    }else{
    var newMenuList = [];
    var newImgMenusRecipes = [];
    var newStringMenusText = [];
    for(var i =0; i < res.length ; i++){
      newMenuList.push(res[i].title)
      newImgMenusRecipes.push('http://localhost:8080/API/image/' + res[i]._id)
      newStringMenusText.push(res[i].content)
    }
    this.setState({menusList : newMenuList})
    this.setState({imgMenusRecipes : newImgMenusRecipes})
    this.setState({stringMenusText : newStringMenusText})
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

  urlCreator(input){
    return "/aliments?" + input;
  }

  render() {
    let alimentBlockList;
    if(this.state.menusList.length == 0){
      alimentBlockList = <div>
        nothing has been found
      </div>
    }else{
      alimentBlockList = this.state.menusList.map(
        (el, index) => {
          return <div>
            <Link to={this.urlCreator(el)}>
              <div className="alimentLineBlock">
                <img className="imgAliment" name={el} indice={index} alt="" src={this.getImage(index)} ></img>
                <div className="textAliment"> 
                  {el}
                  <br></br>
                  {this.getText(index)}
                </div>
              </div>
            </Link>
          </div>
        }
      );
    }
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
