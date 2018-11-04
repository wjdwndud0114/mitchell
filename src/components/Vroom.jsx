import React, { Component } from 'react';
import styled from 'styled-components';
// import axios from 'axios';
// import { TimelineMax, Power2, Bounce } from 'gsap/umd/TweenMax';

const VroomStyled = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: 100%;

    .bar {
        height: 3rem;
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: 5px solid #555;
        .text {
            align-self: center;
            font-size: 2rem;
        }
    }

    .content {
        display: flex;
        width: 100%;
        height: 100%;
    }
`

export default class Vroom extends Component {
    // constructor (props) {
    //     super(props);
    // }

    componentDidMount () {

    }

    render () {
        return (
            <VroomStyled>
                <div className="bar">
                    <div className="text">Vroom.</div>
                </div>
                <div className="content">
                </div>
            </VroomStyled>
        );
    }
}

