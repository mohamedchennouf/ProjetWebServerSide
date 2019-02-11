import React, { Component } from 'react';
import './newPage.css';
import MainFrame from './MainFrame';
class newPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menusList : ["Couscous","Pâtes","Unknown"],
      imgMenusRecipes: ['resources/couscous.png','resources/pâte.png','resources/unknown.png']
    }
  }

  getImage(index){
    return this.state.imgMenusRecipes[index];
  }

  render() {

    let alimentBlockList = this.state.menusList.map(
      (el, index) => {
        return <div className="alimentLineBlock">
          <img className="imgAliment" name={el} indice={index} src={this.getImage(index)} ></img>
          <div className="textAliment">description</div>
        </div>
      }
    );

    let insideContent = 
    <div className="body-content">
    <div>
      {alimentBlockList}
    </div>
    </div>


    return (
      <MainFrame inside = {insideContent}></MainFrame>
    );
  }


}

export default newPage;
