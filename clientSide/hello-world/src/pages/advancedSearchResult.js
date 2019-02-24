import React, { Component } from "react";
import "./advancedSearchResult.css";
import MainFrame from "./MainFrame";
import { cpus } from "os";

class advancedSearchResult extends Component {
    constructor(props) {
      super(props);
      this.state = {
        advancedArgs : [],
        keyWord :[]
      };
    }

    takeCookie(){
      return new Promise((x) => {
      var arg = localStorage.getItem("advancedR").split(",");
      var key = localStorage.getItem("keyWord").split(",");
      console.log(arg);
      this.setState({advancedArgs : arg, keyWord : key});
      console.log(this);
      console.log(this.state.advancedArgs);
      localStorage.clear();
      x();
      });
    }


    componentDidMount() {
      if(localStorage.getItem("advancedR") != null){
        this.takeCookie()
       .then(console.log(this.state.advancedArgs[0]))
       // .then(this.searchFetch());
      }
    
    }

    searchFetch() {
        let url = "http://localhost:8080/API/FOODS/ADVANCE_SEARCH";
        var args = this.state.advancedArgs;
        console.log("{nom: "+ args[0]+ ", ville : " + args[1] + ", magasin : " + args[2] + ", prix : " +args[3] + ",Comparateur: <=, marque: " + args[4] + ", motCle:" + this.state.keyWord + "}");
          //    Comparateur: "<=", marque: args[4], motCle: this.state.keyWord})
        fetch(url , {
          method: "POST",
          headers: {
              Accept: "application/json",
            "Content-Type": "application/json"
            
          },
          body: JSON.stringify({nom: args[0]})
        //  body: JSON.stringify({nom: args[0], ville : args[1], magasin : args[2], prix :args[3],
         //    Comparateur: "<=", marque: args[4], motCle: this.state.keyWord})
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

