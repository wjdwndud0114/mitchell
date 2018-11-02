import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const AppStyled = styled.div`
    text-align: center;
`

class App extends Component {
    render () {
        return (
            <AppStyled>

            </AppStyled>
        );
    }
}

export default hot(module)(App);