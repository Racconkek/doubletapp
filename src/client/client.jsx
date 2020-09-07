import ReactDOM from 'react-dom';
import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/header/header.jsx';
import Home from './components/home/home.jsx';
import Add from './components/add/add.jsx';
import NotFound from './components/notFound/notFound.jsx';
import './client.css';

ReactDOM.render(
    <Router>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/add" component={Add} />
            <Route component={NotFound} />
        </Switch>
    </Router>,
    document.getElementById('main')
);
