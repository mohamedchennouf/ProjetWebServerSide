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
          formulaire:["","","",""],
          file:null,
          redirect:false
      };
      this.handleChange = this.handleChange.bind(this);
      this.addRecipe = this.addRecipe.bind(this);
    }

    addRecipe = () => {
        let body = {title:this.state.formulaire[0],content:this.state.formulaire[1],product:JSON.parse(this.state.formulaire[2]),image:this.state.file};
        fetch(settings.url+ "API/RECETTES", {
            method: "POST",
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify( body)
        })
        .then(function(responseJSON) {
            alert("Your recipe is created");
            this.setState({redirect : true});
        })
        .catch(function (err) {
            console.error(err);
        });

    }


    onChange(e,indice){
        this.state.formulaire[indice.index] = e.target.value;
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
                <input onChange={e => this.onChange(e,{index})} className="inputSubscribe" indice={index} name={el}/>
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
