import React, { Component } from 'react';
import './inscriptionPage.css';
import MainFrame from './MainFrame';
import settings from './../settings';
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
        fetch(settings.url+"API/USER/subscribe", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({data : this.state.formulaire})
        })
        .then(function(responseJSON) {
            })
        .catch(function (err) {
            console.error(err);
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
        </div>

        return (
        <MainFrame inside = {insideContent}></MainFrame>
        );
    }


}

export default inscription;
