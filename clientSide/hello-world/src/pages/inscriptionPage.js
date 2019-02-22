import React, { Component } from 'react';
import './inscriptionPage.css';
import MainFrame from './MainFrame';
class inscription extends Component {

    constructor(props) {
      super(props);
      this.state = {
          inputList: ["Nom","Prénom","Email","Pseudo","Mot De Passe"],
          formulaire:["a","b","c","d","e"]
      };
      this.onSubmit = this.onSubmit.bind(this);
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
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({data : this.state.formulaire})
        })
        .then(function(responseJSON) {
            responseJSON.json()
                .then(function(res) {
                    console.log(res)
                // Maintenant res est un vrai objet JavaScript
                    let div = document.querySelector("#reponsePOST");
                    div.innerHTML = res.msg;
                });
            })
        .catch(function (err) {
            console.log(err);
        });
    }

    onChange(e,indice){
        this.state.formulaire[indice.index] = e.target.value;
    }

    render() {
        let renderInputList = this.state.inputList.map(
            (el,index) =>         
            <div>
                <div>{el}</div>
                <input onChange={e => this.onChange(e,{index})} className="inputSubscribe" indice={index} name={el}/>
            </div>
            );

        let insideContent = 
        <div className="body-content">
            <div className="subscribeSection">
                <div className="subscribeTitle">INSCRIPTION</div>
                    {renderInputList}
                <button className="subscribeButton" onClick={this.onSubmit}>Inscription</button>
            </div>
            <div className="commentary">
        Retrouvez sur notre site des recettes de cuisine faciles pour réussir à tous les coups en cuisine !
        Les recettes sont commentées et notées pour toutes les cuisines. Echangez vos recettes, donnez votre avis et progressez en cuisine.
            </div>
        </div>

        return (
        <MainFrame inside = {insideContent}></MainFrame>
        );
    }


}

export default inscription;
