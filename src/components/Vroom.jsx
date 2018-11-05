import React, { Component } from 'react';
import styled from 'styled-components';
import { TimelineMax, Power2 } from 'gsap/umd/TweenMax';

import VehicleList from './VehicleList';

const VroomStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    opacity: 0;
    transform: translateY(-30px);

    .bar {
        height: 4rem;
        width: 100%;
        display: flex;
        justify-content: center;
        border-bottom: 5px solid #555;
        .text {
            align-self: center;
            font-size: 2rem;
            transition: 1s;
        }
        .text:hover {
            transform: skewX(-25deg);
        }
    }

    .vroom-content {
        display: flex;
        justify-content: center;
        width: calc(100% - 4rem);
        max-width: calc(1395px);
        height: 100%;
        padding: 2rem;
    }
`

export default class Vroom extends Component {
    constructor (props) {
        super(props);
        this.app = React.createRef();
    }

    componentDidMount () {
        (new TimelineMax())
        .to(this.app.current, 1, {
            opacity: 1,
            y: 0,
            ease: Power2.easeOut
        })
    }

    render () {
        return (
            <VroomStyled ref={this.app}>
                <div className="bar">
                    <div className="text">Vroom.</div>
                </div>
                <div className="vroom-content">
                    <VehicleList />
                </div>
            </VroomStyled>
        );
    }
}

