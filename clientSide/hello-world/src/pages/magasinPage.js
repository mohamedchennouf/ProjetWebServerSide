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
    let url = "http://localhost:8080/API/STORES/GET_CITIES";
    fetch(url, {
        method: "POST",
        body:{ville : "Sophia"},
    })
    .then(function(responseJSON) {
        responseJSON.json()
       .then(response => response.json())
       .then(console.log(this))
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
    this.bdFetch();
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
                                <img className="imgButton" alt="" src="resources/maps.png"/>
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
