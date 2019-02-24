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

  changedResult(index, value) {
    var newResult = this.state.result;
    newResult[index] = value;
    this.setState({ result: newResult });
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
        if (index !== 0) {
          elementStr += "<div className='aliment'>\n <div>" + el.product_name + "</div>\n <div>Nutrition : " + el.nutrition_data_per + "</div> \n<div>quantity : " + el.quantity + "</div> \n</div>";
        }
        if (index % 5 === 0 && index > 0) {
          elementStr += "</div>\n<div className='flex' >\n"
        }
        if (index === this.state.alimentList.length - 1) {
          elementStr += "<div className='aliment'>\n <div>" + this.state.alimentList[0].product_name + "</div>\n <div>Nutrition : " + this.state.alimentList[0].nutrition_data_per + "</div> \n<div>quantity : " + this.state.alimentList[0].quantity + "</div> \n</div> \n</div>";
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
          </Col>


          <Col className="specialCol2">
            <span className="title"> Filter by  </span>
            <select className="form-control size-form" id="exampleFormControlSelect1">
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
