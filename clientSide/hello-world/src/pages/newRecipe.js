import React, { Component } from 'react';
import './newRecipe.css';
import MainFrame from './MainFrame';
class inscription extends Component {

    constructor(props) {
      super(props);
      this.state = {
          inputList: ["Title","Description","Ingredients","Image"],
          formulaire:["","","","",""]
      };
      this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(){
        let url = "http://localhost:8080/API/RECETTES";
        let body = {title:this.formulaire[0],content:this.formulaire[1],product:this.formulaire[2],image:this.formulaire[3]};
        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({data : body})
        })
        .then(function(responseJSON) {
            console.log(responseJSON);
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
                <div className="subscribeTitle">ADD RECIPE</div>
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
