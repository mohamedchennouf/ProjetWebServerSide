import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { browserHistory } from 'react-router';
import HomePage from './pages/homePage.js';
import NewPage from './pages/newPage.js';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/new" component={NewPage} />
        </div>
      </Router>
    )

  }
}
export default App;
