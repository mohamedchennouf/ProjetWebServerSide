import React, { Component } from 'react';
import './alimentListPage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import parse from 'html-react-parser'
import settings from './../settings';
import { Row, Col, Container } from 'react-bootstrap';

class alimentListPage extends Component {



  constructor(props) {
    super(props);
    this.state = {
      alimentList: [],
      search: ["Nom", "Ville", "Magasin", "Prix", "Marque"],
      result: ["", "", "", "", ""]
    }
  }

  componentDidMount() {
    this.getAliment()
  }

  onSearch = () => {
    console.log(this.state.result[0]);
    console.log(this.state.result[1]);
    console.log(this.state.result[2]);
    console.log(this.state.result[3]);
    console.log(this.state.result[4]);
    let body =  { nom : this.state.result[0] , ville : this.state.result[1], magasin : this.state.result[2], prix : this.state.result[3],
      Comparateur: "<=", marque: this.state.result[4]};
   
    fetch(settings.url + "API/FOODS/ADVANCE_SEARCH", {
      method: "POST",
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(response => response.json(response))
    .then(response => this.setState({ alimentList: response }))
    .catch(function (err) {
        console.error(err);
      });
  }

  onRefresh = () => {
    fetch(settings.url + 'API/FOODS/RANDOM')
      .then(response => response.json())
      .then(data => {
        this.setState({ alimentList: data });
      })
      .catch(e => console.error(e));
  }




  changedResult(index, value) {
    var newResult = this.state.result;
    newResult[index] = value;
    this.setState({ result: newResult });
  }

  changedSelect(value) {
    let alim = [];
    alim = this.state.alimentList;
    if (value === "Price") {
      alim.sort(function (a, b) {
        return a.price - b.price;
      });
    } else {
      alim.sort(function (a, b) {
        return a.custom_score - b.custom_score;
      });
    }
    this.setState({ alimentList: alim })
  }

  getAliment() {
    fetch(settings.url + 'API/FOODS/RANDOM')
      .then(response => response.json())
      .then(data => {
        this.setState({ alimentList: data });
      })
      .catch(e => console.error(e));
  }

  render() {

    let searchLine = this.state.search.map((el, index) => {
      return (
        <Col>

          <div>
            {el}
          </div>

          <div>
            <input
              className="search-input-aliment"
              indice={index}
              type="search"
              onChange={e => this.changedResult(index, e.target.value)}
            />
          </div>

        </Col>
      );
    });

    let elementStr = "<div className='flex'>\n";
    this.state.alimentList.map(
      (el, index) => {

        var score = 0
        if (el.custom_score) {
          score = el.custom_score;
        }

        if (index !== 0) {
          elementStr += "<div className='aliment'>\n <div className='title'>" + el.product_name + "</div>\n <div> <span className='subtitle'>Nutrition</span> : " + el.nutrition_data_per + "</div> \n<div> <span className='subtitle' >Quantity </span>: " + el.quantity + "</div> \n   <div> <span className='subtitle'>Score : </span> " + score + "</div>   <div> <span className='subtitle'>Price : </span>" + el.price + " </div> </div>";
        }
        if (index % 5 === 0 && index > 0) {
          elementStr += "</div>\n<div className='flex' >\n"
        }
        if (index === this.state.alimentList.length - 1) {
          elementStr += "<div className='aliment'>\n <div className='title'>" + this.state.alimentList[0].product_name + "</div>\n <div> <span className='subtitle' >Nutrition</span> : " + this.state.alimentList[0].nutrition_data_per + "</div> \n<div><span className='subtitle'>Quantity </span> : " + this.state.alimentList[0].quantity + "</div>    <div><span className='subtitle'>Score : </span> " + score + " </div>  <div> <span className='subtitle'>Price : </span className='subtitle'>" + el.price + " </div>   \n</div> \n</div>";
        }
      }
    );

    let insideContent = <div>
      <Container className="marginBottom">
        <Row>
          {searchLine}
        </Row>
        <Row className="specialRow">

          <Col className="specialCol">
            <button className="advancedSearchButton" onClick={this.onSearch}> Search </button>
            <button className="advancedSearchButton" onClick={this.onRefresh}> Refresh </button>
          </Col>


          <Col className="specialCol2">
            <span className="title"> Filter by  </span>
            <select className="form-control size-form" id="exampleFormControlSelect1" onChange={e => this.changedSelect(e.target.value)}>
              <option>Price</option>
              <option>Score</option>
            </select>

          </Col>

        </Row>

      </Container>

      <Container>
        {parse(elementStr)}
      </Container>

    </div>

    return (
      <MainFrame inside={insideContent}></MainFrame>
    );

  }

}

export default alimentListPage;
