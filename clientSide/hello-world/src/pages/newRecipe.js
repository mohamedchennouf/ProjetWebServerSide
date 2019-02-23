import React, { Component } from 'react';
import './newRecipe.css';
import MainFrame from './MainFrame';
class inscription extends Component {

    constructor(props) {
      super(props);
      this.state = {
          inputList: ["Title","Description","Ingredients"],
          formulaire:["","","",""],
          file:null
      };
      this.handleChange = this.handleChange.bind(this);
      this.addRecipe = this.addRecipe.bind(this);
    }

    addRecipe(){
        let url = "http://localhost:8080/API/RECETTES";
        let body = {title:this.state.formulaire[0],content:this.state.formulaire[1],product:this.state.formulaire[2],image:this.state.file};
        fetch(url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify( body)
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

    handleChange(e){
        var imageReader = new FileReader();
        var loadedImage;
        var b64encoded;
        imageReader.onloadend = () => {
            loadedImage = new Uint8Array(imageReader.result);
            b64encoded = btoa(String.fromCharCode.apply(null, loadedImage))
            console.log(b64encoded);
            this.setState({"file":b64encoded});
        } 
        imageReader.readAsArrayBuffer(e.target.files[0]);
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
