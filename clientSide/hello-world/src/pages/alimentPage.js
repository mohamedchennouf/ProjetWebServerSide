import React, { Component } from 'react';
import './alimentPage.css';
import MainFrame from './MainFrame';

class alimentPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
      };
      this.alimentIMG = 'resources/couscous.png';
      this.name = "Couscous";
      this.text = "bla bla bla bla bla";
      this.notation = 4;
      this.commentary = [];
    }

    init(){
        console.log("localStorage: ");
        console.log(localStorage.getItem("image"));
        this.alimentIMG = localStorage.getItem("image");
        this.name = localStorage.getItem("name");
        localStorage.clear();
    }

    commentaryFetch(){
        let url = "http://localhost:8080/API/RECETTES";
        fetch(url, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body:JSON.stringify({ville : ''})
        })
        .then(res => res.json())
        .catch(function (err) {
            console.log(err);
        });
    }

    note(){
        let ZeroStar = "resources/star0.png";
        let star = "resources/star.png";
        let res = [ZeroStar,ZeroStar,ZeroStar,ZeroStar,ZeroStar];
        for(let i=0 ; i < this.notation;i++){
            res[i] = star;
        }
        return res;
    }

    render() {
        this.init();
        let notes = this.note().map(
            (img,indice)=>{
                return <img alt="" src={img} className="rewardImg"></img>
                
        }
        );

        let insideContent = <div className="body-content">
        <div className="upperBlock">
            <div className="textSection">
                {this.text}
            </div>
            <div className="alimentBlock">
                <div className="alimentName">
                    {this.name}
                </div>  
                <img alt="" src={this.alimentIMG} className="alimentImg"></img>
                <div className="reward">
                {notes}
                </div>
            </div>
        </div>
        <div className="commentarySection">
            <div className="alimentName"> Commentary : </div>
            <div className="commentaryBlock">
                <div className="pseudo">Damoy :</div>
                <div className="commentaryText">ce plat est vraiment typiquement Noukoutou!</div>
                
            </div>
        </div>
    </div>;


        return (
        <MainFrame inside = {insideContent}></MainFrame>
        );
    }


}

export default alimentPage;
