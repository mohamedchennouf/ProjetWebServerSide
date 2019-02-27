import React, { Component } from 'react';
import './newRecipe.css';
import MainFrame from './MainFrame';
import settings from './../settings';
import { Redirect } from "react-router";
class inscription extends Component {

    constructor(props) {
      super(props);
      this.state = {
          inputList: ["Title","Description","Ingredients"],
          formulaire:["Tarte au pomme","La tarte aux pommes est un type de tarte sucrée, faite d'une pâte feuilletée ou brisée garnie de pommes émincées. Cette tarte peut être consommée chaude, tiède ou froide","Farine,Jus de pomme",""],
          file:null,
          redirect:false
      };
      this.handleChange = this.handleChange.bind(this);
      this.addRecipe = this.addRecipe.bind(this);
    }

    addRecipe = () => {
        let ingredient = [];
        if(this.state.formulaire[2]){
            ingredient = this.state.formulaire[2].split(",")
        }
        console.log(ingredient);
        let body = {title:this.state.formulaire[0],content:this.state.formulaire[1],product:ingredient,image:this.state.file};
        fetch(settings.url+ "API/RECETTES", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify( body)
        })
        .then((responseJSON) => {
            alert("Your recipe is created");
            this.setState({redirect : true});
        })
        .catch(function (err) {
            console.error(err);
        });

    }


    onChange(e,indice){
        let newFormulaire = this.state.formulaire;
        newFormulaire[indice.index]= e.target.value;
        this.setState({formulaire : newFormulaire});
    }

    handleChange(e){
        var imageReader = new FileReader();
        var loadedImage;
        var b64encoded;
        imageReader.onloadend = () => {
            loadedImage = new Uint8Array(imageReader.result);
            b64encoded = btoa(String.fromCharCode.apply(null, loadedImage))
            this.setState({"file":b64encoded});
        } 
        imageReader.readAsArrayBuffer(e.target.files[0]);
    }

    render() {

        if(this.state.redirect){
            return <Redirect to='/recipe'/>
        }

        let renderInputList = this.state.inputList.map(
            (el,index) =>        
            <div>
                <div>{el}</div>
                <input value={this.state.formulaire[index]} onChange={e => this.onChange(e,{index})} className="inputSubscribe" indice={index} name={el}/>
            </div>
            );

        let insideContent = 
        <div className="body-content">
            <div className="subscribeSection">
                <div className="subscribeTitle">ADD RECIPE</div>
                    {renderInputList}
                    <div>
                        <div>Image</div>
                        <input type="file" onChange={ (e) => this.handleChange(e) }/>
                     </div>
                <button className="subscribeButton" onClick={this.addRecipe}>Add recipe</button>
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
