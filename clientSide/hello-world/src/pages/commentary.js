import React, { Component } from 'react';
import './commentary.css';
import MainFrame from './MainFrame';
import { Redirect } from 'react-router'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import settings from './../settings';
import { Cookies } from 'react-cookie';

class commentary extends Component {

    constructor(props) {
      super(props);
      this.state = {
        id:"",
        name:"",
        userId:"",
        text:"",
        redirect:false
      };
      this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount(){
        var cookie = new Cookies(null);
        var tab = (window.location.href).split("?");
        var res = tab[1].split("&");
        this.setState({id:res[0]});
        this.setState({name:res[1]});
        this.setState({userId: cookie.get("mail") || localStorage.getItem("mail")});
      }

    commentaryPost(){
        fetch(settings.url + "API/RECETTES/COMMENTS", {
            method: "POST",
              credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'},
            body: JSON.stringify({userID: this.state.userId, recipeID: this.state.id, content: this.state.text})
        })
        .then(res => this.setState({redirect : true}))
        .catch(function (err) {
            console.error(err);
        });
    }

    urlCreator(){
        return "/recipeDetails?" + this.state.name;
    }

    onSubmit(){
        this.commentaryPost();
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to={this.urlCreator()} />
        }
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