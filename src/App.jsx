import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

import Home from './components/Home';
import Vroom from './components/Vroom';

const AppStyled = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
`

class App extends Component {
    render () {
        return (
            <AppStyled>
                <Route exact path="/" component={Home} />
                <Route path="/app" component={Vroom} />
            </AppStyled>
        );
    }
}

export default hot(module)(App);