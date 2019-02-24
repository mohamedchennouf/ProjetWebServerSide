import React, { Component } from 'react';
import './alimentListPage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import parse from 'html-react-parser'

class alimentListPage extends Component {



  constructor(props) {
    super(props);
    this.state = {
      alimentList: [],
    }
  }

  componentDidMount() {
    this.getAliment()
  }

  getAliment() {
    fetch('http://localhost:8080/API/FOODS/RANDOM')
      .then(response => response.json())
      .then(data => {
        this.setState({ alimentList: data });
      })
      .catch(e => console.log(e));
  }

  render() {

    let elementStr = "<div className='flex'>\n";
    this.state.alimentList.map(
      (el, index) => {
        elementStr += "<div className='aliment'>\n <div>"+el.product_name+"</div>\n <div>Nutrition : "+el.nutrition_data_per+"</div> \n<div>quantity : "+el.quantity+"</div> \n</div>";  
        if (index % 5=== 0 && index > 0) {
          elementStr += "</div>\n<div className='flex' >\n"
        }
        if(index === this.state.alimentList.length - 1){
          elementStr += "\n</div>"
        }
      }
    );

    let insideContent = <Container>
     { parse(elementStr) }
    </Container>

    return (
      <MainFrame inside={insideContent}></MainFrame>
    );

  }


}

export default alimentListPage;
