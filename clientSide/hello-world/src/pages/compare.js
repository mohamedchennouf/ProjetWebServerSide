import React, { Component } from 'react';
import './compare.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import settings from './../settings';
import { Cookies } from 'react-cookie';

class Compare extends Component {

    constructor(props) {
      super(props);
      this.state = {
          aliment1:[],
          aliment2:[]
      };
    }

    fetchAliment1(){
        fetch(settings.url + "" , {
            method: "GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => this.setData(res))
        .catch(function (err) {
            console.error(err);
        });
    }

    fetchAliment2(){
        fetch(settings.url + "" , {
            method: "GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => this.setData(res))
        .catch(function (err) {
            console.error(err);
        });
    } 

    render() {
        let insideContent = <div>
                        <input type="hidden" id="select2" value="99" data-init-text="lorem ipsum" style="width: 300px" />
                     </div>;
        return (
            <MainFrame inside = {insideContent}></MainFrame>
            );
    }
}


export default Compare;