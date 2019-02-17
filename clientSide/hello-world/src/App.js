import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
//import { browserHistory } from 'react-router';
import HomePage from './pages/homePage.js';
import NewPage from './pages/searchResultPage.js';
import Magasin from './pages/magasinPage.js';
import Inscription from './pages/inscriptionPage.js';
import Aliments from './pages/alimentPage.js';
import searchAdvanced from './pages/searchAdvanced.js';
class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/searchresult" component={NewPage} />
          <Route exact path="/subscribe" component={Inscription}/>
          <Route exact path="/shops" component={Magasin}/>
          <Route exact path="/aliments" component={Aliments}/>
          <Route exact path="/advancedSearch" component={searchAdvanced}/>
        </div>
      </Router>
    )

  }
}
export default App;
