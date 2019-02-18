import React, { Component } from 'react';
import './searchAdvanced.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class searchAdvanced extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    onSubmit(){
         // REQUETES POST
        //let data = new HTMLFormElement();
        //data.elements =  this.state.formulaire;
        //let donneesFormulaire = new FormData(data);

        let url = "http://localhost:8080/API/USER/subscribe";
        console.log(this.state.formulaire);
        fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(this.state.formulaire),
        })
        .then(function(responseJSON) {
            responseJSON.json()
                .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                    let div = document.querySelector("#reponsePOST");
                    div.innerHTML = res.msg;
                });
            })
        .catch(function (err) {
            console.log(err);
        });
    }

    render(){
        let insideContent = <div className="body-content">
            <div className="advancedSearchSection">
                <div>
                    Aliment Name
                    <input className="search-input-aliment" type="search"/>
                </div>
                <div>
                    Note
                    <input className="search-input-aliment" type="search"/>
                </div>
                <div>
                    City
                    <input className="search-input-aliment" type="search"/>
                </div>
                <Link to="/searchresult">
                    <button className="advancedSearchButton">
                        Search
                    </button>
                </Link>
            </div>
        </div>
        return (
            <MainFrame inside = {insideContent}></MainFrame>
        );
    }
}

export default searchAdvanced;