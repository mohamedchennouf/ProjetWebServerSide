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
      //this.onChange = this.onChange.bind(this);
    }

    onSubmit(){
        console.log("inscription");
        console.log(this.state.formulaire[0]);
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
                <input onChange={e => this.onChange(e,{index})} className="input" indice={index} name={el}/>
            </div>
            );

        let insideContent = 
        <div className="body-content">
            <div className="subscribeSection">
                <div className="subscribeTitle">INSCRIPTION</div>
                    {renderInputList}
                <button className="subscribeButton"  onClick={this.onSubmit}>Inscription</button>
            </div>
        </div>

        return (
        <MainFrame inside = {insideContent}></MainFrame>
        );
    }


}

export default inscription;
