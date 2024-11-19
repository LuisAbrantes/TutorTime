import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Manage from './components/Manage';
import Error from './components/Error';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/manage" component={Manage} />
          <Route component={Error} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
