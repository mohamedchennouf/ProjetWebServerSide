import React, { Component } from 'react';
import './magasinPage.css';
import MainFrame from './MainFrame';
import ReactDOM from 'react-dom';
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
        cityList : [],
        magasinList : [],
      //imgMagasinRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
        stringMagasinText: []
    }
  }

  bdFetch(){
    //let url = "http://localhost:8080/API/STORES/GET_STORES_CITY";
    let url = "http://localhost:8080/API/STORES/GET_CITIES";
    fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body:JSON.stringify({ville : ''})
    })
    .then(function(responseJSON) {
      responseJSON.json()
          .then(function(res) {
              console.log(res.msg)
          })})
    //.then(res => {return res.villes})
    .catch(function (err) {
        console.log(err);
    });
    
    }

  fetchAndSetCity(){
    this.bdFetch().then(ReactDOM.render());
    console.log('city : ' + this.state.cityList)
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
    let magasinBlockList = this.state.cityList.map(
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
