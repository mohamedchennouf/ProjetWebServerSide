import React, { Component } from 'react';
import './compare.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import settings from './../settings';
import { Cookies } from 'react-cookie';
import Select2 from "react-select2-wrapper";

class Compare extends Component {

    constructor(props) {
      super(props);
      this.state = {
          aliment1:["","","","",""],
          aliment2:["","","","",""],
          search1: "",
          search2:""
      };
      this.onChangeAliment1 = this.onChangeAliment1.bind(this);
      this.onChangeAliment2 = this.onChangeAliment2.bind(this);
      this.onClick = this.onClick.bind(this);
    }


    onClick(){
            this.fetchAliment1().then(x => this.fetchAliment2().then(x => this.compareAliment()));
            this.fetchAliment2();
            this.compareAliment();
    }

    onChangeAliment1(e){
        this.setState({search1 : e})
    }

    onChangeAliment2(e){
        this.setState({search2 : e})
    }

    alimentParse(res,aliment){
        console.log(res);
        var tab=["","","","",""];
        tab[0] = res[0].product_name;
        tab[1] = res[0].nutrition_data_per;
        tab[2] = res[0].quantity;
        tab[3] = res[0].price;
        tab[4] = res[0].custom_score;
        if(aliment == 1){
            this.setState({aliment1 : tab})
        }else{
            this.setState({aliment2 : tab})
        }
    }

    fetchAliment1(){
        return fetch(settings.url + "API/FOODS/ONE" , {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body :  JSON.stringify({nom : this.state.search1})
        })
        .then(res => res.json())
        .then(res => this.alimentParse(res,1))
        .catch(function (err) {
            console.error(err);
        });
    }

    fetchAliment2(){
       return fetch(settings.url + "API/FOODS/ONE" , {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body :  JSON.stringify({nom : this.state.search2})
        })
        .then(res => res.json())
        .then(res => this.alimentParse(res,2))
        .catch(function (err) {
            console.error(err);
        });
    } 

    compareAliment(){
        //Nutrition
        var res1 = this.state.aliment1;
        var res2 = this.state.aliment2;
        console.log(res1[3] + " , " + res2[3])
        if(res1[1].split("g")[0] < res2[1].split("g")[0]){
            res1[1] = <p><font color="green">{res1[1]}</font></p>
            res2[1] = <p><font color="red">{res2[1]}</font></p>
        }else{
            res1[1] = <p><font color="red">{res1[1]}</font></p>
            res2[1] = <p><font color="green">{res2[1]}</font></p>
        }
        if(res1[2].split(" ")[0] > res2[2].split(" ")[0]){
            res1[2] = <p><font color="green">{res1[2]}</font></p>
            res2[2] = <p><font color="red">{res2[2]}</font></p>
        }else{
            res1[2] = <p><font color="red">{res1[2]}</font></p>
            res2[2] = <p><font color="green">{res2[2]}</font></p>
        }
        if(res1[3] < res2[3]){
            res1[3] = <p><font color="green">{res1[3]}</font></p>
            res2[3] = <p><font color="red">{res2[3]}</font></p>
        }else{
            res1[3] = <p><font color="red">{res1[3]}</font></p>
            res2[3] = <p><font color="green">{res2[3]}</font></p>
        }  
        
        if(res1[4] < res2[4]){
            res1[4] = <p><font color="green">{res1[4]}</font></p>
            res2[4] = <p><font color="red">{res2[4]}</font></p>
        }else{
            res1[4] = <p><font color="red">{res1[4]}</font></p>
            res2[4] = <p><font color="green">{res2[4]}</font></p>
        }
        this.setState({aliment1 : res1})
        this.setState({aliment2 : res2})
        //Quantity
        //Price
    }

    render() {
        let insideContent = 
        <div className="body-content">
            <div className="searchBlock">
                <div className="block1">
                    Aliment 1
                    <br></br>
                    <input id="aliment1"  onChange={e => this.onChangeAliment1(e.target.value)}/>
                </div>
                <button className="buttonVS" onClick={this.onClick}>Fight!</button>
                <div className="block2">
                    Aliment 2
                    <br></br>
                    <input id="aliment2"  onChange={e => this.onChangeAliment2(e.target.value)}/>
                 </div>
             </div>
             <div className="vsBlock">
                <div className="blockVs1"> 
                    <div className="partie1">
                        <div className="titleVS"> NAME : </div>
                                {this.state.aliment1[0]}
                        <div className="titleVS"> NUTRITION : </div>
                        <div>{this.state.aliment1[1]}</div>
                        <div className="titleVS"> QUANTITY : </div>
                        <div>{this.state.aliment1[2]}</div>
                        <div className="titleVS"> PRICE : </div>
                        <div>{this.state.aliment1[3]}</div>
                        <div className="titleVS"> SCORE : </div>
                        <div>{this.state.aliment1[4]}</div>
                    </div>
                    <div className="partie2">
                        <div className="imageBloc">
                        <img className="imageInBloc" src="resources/none.png"/>
                        </div>
                    </div>
                </div>
                <img className="Vs"  src="resources/vs.png"/>
                <div className="blockVs2">
                    <div className="partie1">
                        <div className="titleVS"> NAME : </div>
                        <div>{this.state.aliment2[0]}</div>
                        <div className="titleVS"> NUTRITION : </div>
                        <div>{this.state.aliment2[1]}</div>
                        <div className="titleVS"> QUANTITY : </div>
                        <div>{this.state.aliment2[2]}</div>
                        <div className="titleVS"> PRICE : </div>
                        <div>{this.state.aliment2[3]}</div>
                        <div className="titleVS"> SCORE : </div>
                        <div>{this.state.aliment2[4]}</div>
                    </div>
                    <div className="partie2">
                        <div className="imageBloc">
                            <img className="imageInBloc" src="resources/none.png"/>
                        </div>
                    </div>
                </div>
             </div>
        </div>;

        return (
            <MainFrame inside = {insideContent}></MainFrame>
            );
    }
}


export default Compare;