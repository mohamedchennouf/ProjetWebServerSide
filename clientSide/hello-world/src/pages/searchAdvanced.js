import React, { Component } from "react";
import "./searchAdvanced.css";
import MainFrame from "./MainFrame";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Select2 from "react-select2-wrapper";



class searchAdvanced extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ["Nom", "Ville", "Magasin", "Prix", "Marque"],
      result:["","","","","",[]]
    };
  }

  changedResult(index,value){
    var newResult = this.state.result;
    newResult[index] = value;
    this.setState({result : newResult});
  }

  changedKeyElement(value){
    console.log(value.length)
  }

  render() {
    let searchLine = this.state.search.map((el, index) => {
      return (
        <div>
          {el}
          <input
            className="search-input-aliment"
            indice={index}
            type="search"
            onChange = {e => this.changedResult(index,e.target.value)}
          />
        </div>
      );
    });
    
    let prop = {
      tags: true,
      multiple: true
    };

    let insideContent = (
      <div className="body-content">
        <div className="advancedSearchSection">
          {searchLine}
          <div>Mot-clé
            <Select2 multiple options={prop} className="search-input-aliment" onChange={e => this.changedKeyElement(prop)}/>
          </div>
          <Link to="/searchresult">
            <button className="advancedSearchButton">Search</button>
          </Link>
        </div>
      </div>
    );
    return <MainFrame inside={insideContent} />;
  }
      
}

export default searchAdvanced;
