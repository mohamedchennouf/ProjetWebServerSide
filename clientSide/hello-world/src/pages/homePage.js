import React, { Component } from 'react';
import MainFrame from './MainFrame';
import './homePage.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bestRecette: [{ title: 'couscous' }, { title: 'pâtes' }, { title: 'unknown' }],
      imgTopRecipes: ['resources/couscous.png', 'resources/pâte.png', 'resources/unknown.png']
    }
  }


  componentDidMount() {
    this.getBestRecipe()
  }

  getImage(index) {
    return this.state.imgTopRecipes[index];
  }


  onSubmit() {
    // REQUETES POST
    //let data = new HTMLFormElement();
    //data.elements =  this.state.formulaire;
    //let donneesFormulaire = new FormData(data);

    let url = "http://localhost:8080/API/USER/subscribe";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.formulaire),
    })
      .then(function (responseJSON) {
        responseJSON.json()
          .then(function (res) {
            // Maintenant res est un vrai objet JavaScript
            let div = document.querySelector("#reponsePOST");
            div.innerHTML = res.msg;
          });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  getBestRecipe() {
    fetch('http://localhost:8080/API/RECETTES?res=6')
      .then(response => response.json())
      .then(data => {
        this.setState({ bestRecette: data });
      })
      .catch(e => console.log(e));
  }


  getImg(id) {
    fetch('http://localhost:8080/API/image/'+id)
      .then(response => response.json())
      .then(data => {
        this.setState({ img: data });
      })
      .catch(e => console.log(e));
  }



  render() {

    let alimentList = this.state.bestRecette.slice(0, 3).map(
      (el, index) => {
        return (
          <Col sm>
            <div className="cardRecipe">
              <img className="cardimg" name={el.title} indice={index} alt="" src={this.getImage(index)} ></img>
              <div className="cardname">{el.title}</div>
            </div>
          </Col>)
      }
    );

    console.log(this.state.bestRecette);
    let alimentList2 = this.state.bestRecette.slice(3, 6).map(
      (el, index) => {
        return (
          <Col sm>
            <div className="cardRecipe">
              <img className="cardimg" name={el.title} indice={index} alt="" src={this.getImage(index)} ></img>
              <div className="cardname">{el.title}</div>
            </div>
          </Col>)
      }
    );

    let insideContent = <div className="body-content">
      <div className="search">
        <div className="search-content">
          <p><span className="title-search">Find a recipe...</span></p>
          <input className="search-input" type="search" />
          <Link to="/searchresult">
            <button className="search-button">search</button>
          </Link>
          <div><Link to="/advancedSearch">advanced Search</Link></div>
        </div>
      </div>
      <div className="top-recipe">
        <Container>
          <Row>
            {alimentList}
          </Row>
          <Row>
            {alimentList2}
          </Row>
        </Container>

      </div>


      <div className="commentary">
        Retrouvez sur notre site des recettes de cuisine faciles pour réussir à tous les coups en cuisine !
        Les recettes sont commentées et notées pour toutes les cuisines. Echangez vos recettes, donnez votre avis et progressez en cuisine.
      </div>
    </div>

    return <MainFrame inside={insideContent}></MainFrame>
      ;

  }


}

export default HomePage;
