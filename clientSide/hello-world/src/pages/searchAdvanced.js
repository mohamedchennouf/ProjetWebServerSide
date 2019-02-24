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
      result: ["", "", "", "", ""],
      keyWord: [],
      select: (
        <Select2
          multiple
          options={{
            tags: true,
            multiple: true
          }}
          className="search-input-aliment"

          // onChange={e => this.changedKeyElement(e)}
        />
      )
    };

    this.changedKeyElement = this.changedKeyElement.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  changedResult(index, value) {
    var newResult = this.state.result;
    newResult[index] = value;
    this.setState({ result: newResult });
  }

  changedKeyElement(e) {
    console.log(this.getKeyElemenents(e.target.options));
  }

  getKeyElemenents(options) {
    var result = [];
    for (var i = 0, len = options.length; i < len; i++) {
      var opt = options[i];

      if (opt.selected) {
        result.push(opt.value);
      }
    }
    console.log("keyword : " + this.state.keyWord.length);
    console.log("res : " + result.length);
    if (this.state.keyWord.length !== result.length) {
      this.setState({ keyWord: result });
    }
    return result;
  }

  onSubmit() {
    localStorage.setItem("advancedR", this.state.result);
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
            onChange={e => this.changedResult(index, e.target.value)}
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
          <div>
            Mot-clé
            {this.state.select}
          </div>
          <Link to="/advancedresult">
            <button className="advancedSearchButton" onClick={this.onSubmit}>
              Search
            </button>
          </Link>
        </div>
      </div>
    );
    return <MainFrame inside={insideContent} />;
  }
}

export default searchAdvanced;
