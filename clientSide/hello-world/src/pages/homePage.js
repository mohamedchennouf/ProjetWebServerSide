import React, { Component } from 'react';
import MainFrame from './MainFrame';
import './homePage.css';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bestRecette: [{title:'couscous'},{title:'pâtes'},{title:'unknown'}],
      imgTopRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png']
    }
  }

  componentDidMount(){
    this.getBestRecette()
  }

  getImage(index){
    return this.state.imgTopRecipes[index];
  }

  
  onSubmit(){
     // REQUETES POST
        //let data = new HTMLFormElement();
        //data.elements =  this.state.formulaire;
        //let donneesFormulaire = new FormData(data);

        let url = "http://localhost:8080/API/USER/subscribe";
        console.log(this.state.formulaire);
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state.formulaire),
        })
        .then(function(responseJSON) {
            responseJSON.json()
                .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                    let div = document.querySelector("#reponsePOST");
                    div.innerHTML = res.msg;
                });
            })
        .catch(function (err) {
            console.log(err);
        });
  }

  getBestRecette(){ 
  fetch('http://localhost:8080/API/RECETTES?res=3')
      .then(response => response.json())
      .then(data => {
        this.setState( {bestRecette:data});
        console.log(this.state);
      })
      .catch(e => console.log("error"));
    }

  render() {

    let alimentList = this.state.bestRecette.map(
      (el, index) => {
        return <div className="cardRecipe">
          <img className="cardimg" name={el.title} indice={index} alt="" src={this.getImage(index)} ></img>
          <div className="cardname">{el.title}</div>
        </div>
      }
    );

    let insideContent = <div className="body-content">
      <div className="search">
        <div className="search-content">
          <p><span className="title-search">Find a recipe...</span></p>
          <input className="search-input" type="search"/>
          <Link to="/searchresult">
            <button className="search-button">search</button>
          </Link>
          <div><Link to="/advancedSearch">advanced Search</Link></div>
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
