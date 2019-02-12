import React, { Component } from 'react';
import './inscription.css';
import MainFrame from './MainFrame';
class inscription extends Component {

    constructor(props) {
      super(props);
      this.state = {
          inputList: ["Nom","Prénom","Email","Pseudo","Mot De Passe"],
          formulaire:["a","b","c","d","e","f"]
      };
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
   /*    // REQUETES POST
    // Pour éviter que la page ne se ré-affiche
        event.preventDefault();

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
        let form = this.state.formulaire;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(this.state.formulaire);

        let url = "/users/subscribe";

        fetch(url, {
            method: "POST",
            body: donneesFormulaire
        })
        .then(function(responseJSON) {
            responseJSON.json()
                .then(function(res) {
                // Maintenant res est un vrai objet JavaScript
                    afficheReponsePOST(res);
                });
            })
        .catch(function (err) {
            console.log(err);
        });*/
    }

    onChange(e,indice){
        this.state.formulaire[indice.index] = e.target.value;
        console.log(e.target.value);
        console.log(indice.index);
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
                <button className="subscribeButton"  onClick={this.onSubmit}>Inscription</button>
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
