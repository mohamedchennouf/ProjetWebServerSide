import React, { Component } from 'react';
import './magasinPage.css';
import MainFrame from './MainFrame';
/*class magasinJson{
    constructor(id,nom,adresse,ville,longitude,latitude){
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.ville = ville;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}*/


class magasinPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cityList : ["Nice","Sophia","Paris"],
        magasinList : [["Carefour","Auchan","SushiShop"],["Boulangerie","Subway","Casino"],["KFC","MacDo","BurgerKing"]],
      //imgMagasinRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
        stringMagasinText: ["je fait du couscous avec toutes la famille","j'aime les banane","Wat"]
    }
  }

  bdFetch(){
         // REQUETES POST
    // Pour éviter que la page ne se ré-affiche

    // Récupération du formulaire. Pas besoin de document.querySelector
    // ou document.getElementById puisque c'est le formulaire qui a généré
    // l'événement
    let form = this.state.formulaire;
    // Récupération des valeurs des champs du formulaire
    // en prévision d'un envoi multipart en ajax/fetch
        let donneesFormulaire = new FormData(this.state.formulaire);

        let url = "localhost:8080/API/STORES/GET_STORES_CITY";

        fetch(url, {
            method: "POST",
            body: donneesFormulaire
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

  newRecipe(newMagasin,newText){
    this.state.magasinList.push(newMagasin);
    //this.state.imgMenusRecipes.push(newImg);
    this.state.stringMagasinText.push(newText);
  }

  getText(index){
    return this.state.stringMagasinText[index];
  }

  getName(indice,index){
      return this.state.magasinList[indice][index];
  }

  getCityName(index){
    return this.state.cityList[index];
  }

  render() {

    let magasinBlockList = 
    this.state.cityList.map(
        (city,indice)=>{
            return <div className="cityBlock">
                <div className="cityNameStyle">
                    {this.getCityName(indice)}
                </div>
                {this.state.magasinList.map(
                    (el, index) => {
                        return <div className="magasinLineBlock">
                            <div className="nomMagasin"> 
                                {this.getName(indice,index)}
                            </div>
                            <button className="buttonMap" name={el} indice={index}>
                                Show map
                                <img className="imgButton" src="resources/maps.png"/>
                            </button>
                            <div className="textMagasin"> 
                                {this.getText(index)}
                            </div>
                        </div>
                    }
                )}
            </div>
        }
    );
    let insideContent = 
    <div className="body-content">
    <div>
      {magasinBlockList}
    </div>
    </div>

    return (
      <MainFrame inside = {insideContent}></MainFrame>
    );
  }


}

export default magasinPage;
