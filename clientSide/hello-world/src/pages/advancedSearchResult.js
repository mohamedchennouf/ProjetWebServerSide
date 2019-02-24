import React, { Component } from "react";
import "./advancedSearchResult.css";
import MainFrame from "./MainFrame";
import { cpus } from "os";
import parse from 'html-react-parser';
import { Container } from 'react-bootstrap';
import settings from './../settings';

class advancedSearchResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
        advancedArgs:[],
        keyWord:[],
        resAliment:[],
      };
    }

    takeCookie(){
      if(localStorage.getItem("advancedR") != null){
        var mail =  localStorage.getItem("mail");
        var arg = localStorage.getItem("advancedR").split(",");
        var key = localStorage.getItem("keyWord").split(",");
        //this.setState({advancedArgs: arg});
        this.state.advancedArgs = arg;
        this.state.keyWord = key;
        localStorage.clear();
        localStorage.setItem("mail",mail);
        this.searchFetch();
      }
    }
    


    componentWillMount() {
        this.takeCookie()
    }

    searchFetch() {
        var args = this.state.advancedArgs;
        fetch(settings.url +  "API/FOODS/ADVANCE_SEARCH", {
          method: "POST",
          headers: {
              "Accept": "application/json",
            "Content-Type": "application/json"
            
          },
          body: JSON.stringify({nom: args[0], ville : args[1], magasin : args[2], prix :args[3],
             Comparateur: "<=", marque: args[4], motCle: this.state.keyWord})
        })
          .then(response => response.json(response))
          .then(response => this.setState({ resAliment: response }))
          .catch(function(err) {
            console.error(err);
          });
      }

    render(){
      let elementStr = "<div className='flex'>\n";
      this.state.resAliment.map(
        (el, index) => {
          if(index !== 0){
            elementStr += "<div className='aliment'>\n <div>"+el.product_name+"</div>\n <div>Nutrition : "+el.nutrition_data_per+"</div> \n<div>quantity : "+el.quantity+"</div> \n</div>";
          }
          if (index % 5=== 0 && index > 0) {
            elementStr += "</div>\n<div className='flex' >\n"
          }
          if(index === this.state.resAliment.length - 1){
            elementStr += "<div className='aliment'>\n <div>"+this.state.resAliment[0].product_name+"</div>\n <div>Nutrition : "+this.state.resAliment[0].nutrition_data_per+"</div> \n<div>quantity : "+this.state.resAliment[0].quantity+"</div> \n</div> \n</div>";
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

export default advancedSearchResult;

