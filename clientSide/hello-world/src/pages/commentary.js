import React, { Component } from 'react';
import './commentary.css';
import MainFrame from './MainFrame';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

class commentary extends Component {

    constructor(props) {
      super(props);
      this.state = {
        id:"",
        name:"",
        userId:"",
        text:"",
      };
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        var tab = (window.location.href).split("?");
        var res = tab[1].split("&");
        this.setState({id:res[0]});
        this.setState({name:res[1]});
        this.setState({userId: "a"})
      }

    commentaryPost(){
        let url = "http://localhost:8080/API/RECETTES/COMMENTS";
        fetch(url, {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify({userID: this.state.userId, recipeID: this.state.id, content: this.state.text})
        })
        .then(res => res.json())
        .catch(function (err) {
            console.err(err);
        });
    }

    urlCreator(){
        return "/recipeDetails?" + this.state.name;
    }

    onSubmit(){
        this.commentaryPost();
    }

    render() {
        let insideContent = <div className="commentBigBloc">
        <textarea className="commentTxtBloc" onChange={e => this.setState({text : e.target.value })}></textarea>
            <div>
                <button className="button" onClick={this.onSubmit}>OK</button>
                <Link to={this.urlCreator()}>
                    <button className="button">CANCEL</button>
                </Link>
            </div>
        </div>;
        return (
            <MainFrame inside = {insideContent}></MainFrame>
            );
    }
    
}
export default commentary;