import React, { Component } from 'react';
import './alimentPage.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class alimentPage extends Component {

    constructor(props) {
      super(props);
      this.state = {
          alimentIMG:  '',
          name: "",
          text: "",
          aliments: "",
          id:"",
          notation:4,
          poceBlo:0,
          commentary:[],
          pseudo:[]
      };
      this.poceBloPost = this.poceBloPost.bind(this);
    }

    urlParser(){
        var res = (window.location.href).split("?");
        return res[1];
      }

    componentDidMount(){
        this.recipeFetch();
    }

    poceBloPost(){
        var newCount = this.state.poceBlo + 1;
        this.setState({poceBlo : newCount})
    }

    recipeFetch(){
        let url = "http://localhost:8080/API/RECETTE/" + this.urlParser();
        fetch(url, {
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

    commentsFetch(){
        let url = "http://localhost:8080/API/RECETTES/COMMENT/" + this.state.id;
        fetch(url, {
            method: "GET",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'}
        })
        .then(res => res.json())
        .then(res => this.commentaryParse(res))
        .catch(function (err) {
            console.log(err);
        });
    }

    commentaryParse(res){
        var newPseudo = [];
        var newCommentary = [];
        for(var i = 0; i < res.length;i++){
            newPseudo.push(res[i].userId);
            newCommentary.push(res[i].content);
        }
        this.setState({pseudo : newPseudo})
        this.setState({commentary : newCommentary})
    }

    setData(res){
        this.setState({name : res.title});
        this.setState({alimentIMG : 'http://localhost:8080/API/image/' + res._id });
        this.setState({text : res.content});
        this.setState({aliments : res.ingredient});
        this.setState({poceBlo : res.poceBlo});
        this.setState({id : res._id});
        this.commentsFetch();

    }

    note(){
        let ZeroStar = "resources/star0.png";
        let star = "resources/star.png";
        let res = [ZeroStar,ZeroStar,ZeroStar,ZeroStar,ZeroStar];
        for(let i=0 ; i < this.state.notation;i++){
            res[i] = star;
        }
        return res;
    }
    
    urlCreator(){
        return "/commentary?" + this.state.id + "&" + this.state.name;
    }

    render() {
        let notes = this.note().map(
            (img)=>{
                return <img alt="" src={img} className="rewardImg"></img>
                
        }
        );

        let insideContent = <div className="body-content">
        <div className="upperBlock">
            <div className="textSection">
                decription : 
                <br></br>
                {this.state.text}
                <br></br>
                ingredient :
                <br></br>
                {this.state.aliments}
            </div>
            <div className="alimentBlock">
                <div className="alimentName">
                    {this.state.name}
                </div>  
                <img alt="" src={this.state.alimentIMG} className="alimentImg"></img>
                <div className="reward">
                {notes}
                </div>
                <div className="poceBloBloc">
                    <button className="buttonPoceBlo" onClick={this.poceBloPost}><img className="poceBloImg" src="resources/poceBleu.png"/></button>
                    <div className="poceBloRes">
                        {this.state.poceBlo}
                    </div>
                </div>
            </div>
        </div>
        <div className="commentarySection">
            <div className="alimentName"> Commentary : </div>
            {this.state.commentary.map((elm,index) => 
            <div className="commentaryBlock">
                <div className="pseudo">{this.state.pseudo[index]}</div>
                <div className="commentaryText">{elm}</div>
                
            </div>
            )}
            <Link to={this.urlCreator()}>
                <button className="buttonComment">new Comment</button>
            </Link>
        </div>
    </div>;


        return (
        <MainFrame inside = {insideContent}></MainFrame>
        );
    }


}

export default alimentPage;
