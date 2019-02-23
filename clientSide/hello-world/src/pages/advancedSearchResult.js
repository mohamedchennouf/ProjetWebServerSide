import React, { Component } from "react";
import "./advancedSearchResult.css";
import MainFrame from "./MainFrame";

class advancedSearchResult extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    searchFetch() {
        let url = "http://localhost:8080/API/PRICE";
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({  })
        })
          .then(response => response.json())
          .then(response => this.constructTabStore(response.stores))
          .catch(function(err) {
            console.log(err);
          });
      }

    render(){
        let insideContent =  <div></div>;
        return <MainFrame inside={insideContent}/>;
    }
}
export default advancedSearchResult;

