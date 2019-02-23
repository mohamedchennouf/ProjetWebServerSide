import React, { Component } from 'react';
import './magasinPage.css';
import MainFrame from './MainFrame';
import ReactDOM from 'react-dom';
import { puts } from 'util';

class magasinJson{
    constructor(id,nom,adresse,ville,longitude,latitude){
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.ville = ville;
        this.longitude = longitude;
        this.latitude = latitude;
    }
}


class magasinPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cityList : [],
        magasinList : {} ,
      //imgMagasinRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png'],
        stringMagasinText: []
    }
  }

  componentDidMount() {
    this.cityFetch()
  }

  storeFetch(){
    let url = "http://localhost:8080/API/STORES/GET_STORES_CITIES";
    fetch(url,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body:JSON.stringify({villes : this.state.cityList})
    })
    .then(response => response.json())
    .then(response => this.constructTabStore(response.stores))
    .catch(function (err) {
      console.log(err);
    });
  }

  constructTabStore(data){
    var tab = {};
    for(var i = 0 ; i< this.state.cityList.length;i++){
      if(this.state.cityList[i] == data[i][0].ville){
        tab[this.state.cityList[i]] = data[i];
      }else{
        var j = 0;
        while(this.state.cityList[j] != data[i][0].ville){
          j++
        }
        tab[this.state.cityList[j]] = data[i];
      }
    }
    this.setState({magasinList : tab});
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
    .then(res => this.storeFetch())
    .catch(function (err) {
        console.log(err);
    });
    }

  getText(index){
    return this.state.stringMagasinText[index];
  }

  getName(city,index){
    return this.state.magasinList[city][index].nom;
}

  linkCreator(city,index){
    var res = "https://www.google.com/maps/?q=";
    var data = this.state.magasinList[city][index];
    res = res + data.latitude + "," + data.longitude;
    return res
  }
  render() {
    let magasinBlockList = null;
    if(Object.keys(this.state.magasinList).length > 0){
      magasinBlockList = this.state.cityList.map(
        (city)=>{
            return <div className="cityBlock">
                <div className="cityNameStyle">
                    {city}                
                </div>
                {this.state.magasinList[city].map(
                  (el, index) => {
                    return <div className="magasinLineBlock">
                    <div className="nomMagasin"> 
                      {this.getName(city,index)}
                    </div>
                    <a href={this.linkCreator(city,index)}
                     className="buttonMap" name={el} indice={index}>
                      Show map
                      <img className="imgButton" alt="" src="resources/maps.png"/>
                    </a>
                    <div className="textMagasin"> 
                      {this.getText(index)}
                    </div>
                   </div>
                  })
                  }
            </div>
        }
      );
      }
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
