import React, { Component } from 'react';
import './magasinPage.css';
import MainFrame from './MainFrame';
import ReactDOM from 'react-dom';
import { puts } from 'util';
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

  componentWillMount() {
    var promise1 = this.cityFetch();
    Promise.all(promise1)
    .then(this.storeFetch())
    .then(console.log("end pre-render"));
  }

  storeFetch(){
    this.state.cityList.map( (city,index) => {
      let url = "http://localhost:8080/API/STORES/GET_STORES_CITY";
      fetch(url,{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body:JSON.stringify({ville : city})
      })
      .then(response => response.json())
      .then(response => response.map((elme) =>{
        if(this.state.magasinList.length < index+1){
          this.state.magasinList.push([]);
        }
        this.state.magasinList[index].push(elme.nom);
        console.log("end fetch " + elme.nom)
      }))
      .then(console.log("end fetch store"))
      .catch(function (err) {
        console.log(err);
      });
    })
  }


  cityFetch(){
    let url = "http://localhost:8080/API/STORES/GET_CITIES";
    fetch(url, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'},
        body:JSON.stringify({ville : ''})
    })
    .then(res => res.json())
    .then(res => this.setState({cityList : res.villes}))
    .then(console.log("end city fetch"))

    .catch(function (err) {
        console.log(err);
    });
    }

  getText(index){
    return this.state.stringMagasinText[index];
  }

  getName(indice,index){
    console.log("indice : " + indice + " " + this.state.magasinList[indice]);
    return this.state.magasinList[indice][index];
}

  render() {
    console.log(this.state.magasinList.length)
    let magasinBlockList = this.state.cityList.map(
        (city,indice)=>{
            return <div className="cityBlock">
                <div className="cityNameStyle">
                    {city}
                    {console.log(this.state.magasinList.length)}
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
