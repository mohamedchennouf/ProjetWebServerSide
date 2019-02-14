import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './pages/homePage.js';
import NewPage from './pages/searchResult.js';
import Inscription from './pages/inscription.js';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/searchresult" component={NewPage} />
          <Route exact path="/subscribe" component={Inscription}/>
        </div>
      </Router>
    )

  }
}
export default App;
