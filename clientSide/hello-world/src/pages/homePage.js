import React, { Component } from 'react';
import MainFrame from './MainFrame';
import './homePage.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import settings from './../settings';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bestRecette: [{ title: 'couscous' }, { title: 'pâtes' }, { title: 'unknown' }],
      imgTopRecipes: ['resources/couscous.png', 'resources/pâte.png', 'resources/unknown.png'],
      search: "",
      urlSearch: ""
    }
  }


  componentDidMount() {
    this.getBestRecipe()
  }

  getImage(index) {
    return this.state.imgTopRecipes[index];
  }

  getBestRecipe() {
    fetch(settings.url+"API/RECETTES?res=6")
      .then(response => response.json())
      .then(data => {
        var myData = data;
        myData.forEach(function (element) {
          element.urlImg = settings.url+'API/image/' + element._id;
        });
        this.setState({ bestRecette: myData });
      })
      .catch(e => console.log(e));
  }


  urlCreator(text) {
    var url = "/searchresult?"
    var tabInput = text.split(" ");
    for (var i = 0; i < tabInput.length - 1; i++) {
      url += tabInput[i] + "&";
    }
    url += tabInput[tabInput.length - 1];
    this.setState({ urlSearch: url });
  }

  urlCreatorDetail(el){
    return "/recipeDetails?" + el;
  }
  

  render() {

    let alimentList = this.state.bestRecette.slice(0, 3).map(
      (el, index) => {
        return (
        
            <Col sm>
             <Link to={this.urlCreatorDetail(el.title)}>
              <div className="cardRecipe">
                <img className="cardimg" name={el.title} indice={index} alt="" src={el.urlImg} ></img>
                <div className="cardname">{el.title}</div>
              </div>
              </Link>
            </Col>
         
        )
      }
    );

    let alimentList2 = this.state.bestRecette.slice(3, 6).map(
      (el, index) => {
        return (
          
            <Col sm>
            <Link to={this.urlCreatorDetail(el.title)}>
              <div className="cardRecipe">
                <img className="cardimg" name={el.title} indice={index} alt="" src={el.urlImg} ></img>
                <div className="cardname">{el.title}</div>
              </div>
              </Link>
            </Col>
          )
      }
    );

    let insideContent = <div className="body-content">
      <div className="search">
        <div className="search-content">
          <p><span className="title-search">Find a recipe...</span></p>
          <input className="search-input" type="search" onChange={e => this.urlCreator(e.target.value)} />
          <Link to={this.state.urlSearch}>
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
