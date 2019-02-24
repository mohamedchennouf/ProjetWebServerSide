import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
//import { browserHistory } from 'react-router';
import HomePage from './pages/homePage.js';
import NewPage from './pages/searchResultPage.js';
import Magasin from './pages/magasinPage.js';
import Inscription from './pages/inscriptionPage.js';
import Aliments from './pages/alimentPage.js';
import searchAdvanced from './pages/searchAdvanced.js';
import recipe from './pages/recipePage.js';
import alimentList from './pages/alimentListPage.js';
import addNewRecipe from './pages/newRecipe.js';
import commentary from './pages/commentary.js';
import advancedPage from './pages/advancedSearchResult.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      log: false
    };
  }

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/searchresult" component={NewPage} />
          <Route exact path="/subscribe" component={Inscription}/>
          <Route exact path="/shops" component={Magasin}/>
          <Route exact path="/recipeDetails" component={Aliments}/>
          <Route exact path="/advancedSearch" component={searchAdvanced}/>
          <Route exact path="/recipe" component={recipe}/>
          <Route exact path="/alimentList" component={alimentList}/>
          <Route exact path="/addNewRecipe" component={addNewRecipe}/>
          <Route exact path="/commentary" component={commentary}/>
          <Route exact path="/advancedresult" component={advancedPage} />
          
        </div>
      </Router>
    )

  }
}
export default App;
