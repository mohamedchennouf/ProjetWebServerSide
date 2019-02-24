import React, { Component } from "react";
import "./advancedSearchResult.css";
import MainFrame from "./MainFrame";

class advancedSearchResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
        advancedArgs : ["", "", "", "", ""],
        keyWord :[]
      };
    }

    componentWillMount() {
      this.setState({advancedArgs : localStorage.getItem("advancedR")});
      this.setState({keyWord : localStorage.getItem("keyWord")});
      localStorage.clear();
      this.searchFetch();
    }

    searchFetch() {
        let url = "http://localhost:8080/API/PRICE";
        var args = this.state.advancedArgs
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({nom: args[0],ville : args[1],magasin : args[2], prix :args[3],
             Comparateur: "<=", marque: args[4], motCle: this.state.keyWord})
        })
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(function(err) {
            console.error(err);
          });
      }

    render(){
        let insideContent =  <div></div>;
        return <MainFrame inside={insideContent}/>;
    }
}
export default advancedSearchResult;

