import React, { Component } from 'react';
import './alimentListPage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

class alimentListPage extends Component {



  constructor(props) {
    super(props);
    this.state = {
      alimentList: []
    }
  }

  componentDidMount() {
    this.getAliment()
  }

  getAliment() {
    fetch('http://localhost:8080/API/FOODS/RANDOM')
      .then(response => response.json())
      .then(data => {
        var myData = [];
        data.forEach(element => {
          if (element.product_name) {
            myData.push(element);
          }
        });
        this.setState({ alimentList: myData });
      })
      .catch(e => console.log(e));
  }






  render() {

    let aliments = this.state.alimentList.slice(0, 5).map(
      (el) => {
        console.log(el);
        return <div className="aliment">
          <div>{el.product_name}</div>
          <div>Nutrition : {el.nutrition_data_per}</div>
          <div>quantity : {el.quantity}</div>
        </div>
      }
    );

    let rowAliments = this.state.alimentList.map(
      (el, index) => {
        if(index%5){
          return <Row>
            {aliments}
          </Row>
        }
      }
    );

    

    let insideContent = <Container>
      {rowAliments}
    </Container>

    return (
      <MainFrame inside={insideContent}></MainFrame>
    );

  }


}

export default alimentListPage;
