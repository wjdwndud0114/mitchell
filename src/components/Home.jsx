import React, { Component } from 'react';
import styled from 'styled-components';
import { TimelineMax, Power2, Bounce } from 'gsap/umd/TweenMax';

const HomeStyled = styled.div`
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    width: calc(100% - 4rem);
    height: 100%;
    max-width: calc(1280px);
    flex-wrap: wrap;
    margin: auto;

    .titleText {
        font-size: 8rem;
        margin: 0 0 1rem 1rem;
        transform: translateY(-100px);
        opacity: 0;
    }
    .titleSubText {
        font-size: 1.5rem;
        margin: 0 0 0 1rem;
        transform: translateY(30px);
        opacity: 0;
    }

    .content {
        display: flex;
        flex-direction: column;
    }
    .content.left {
        margin-bottom: 3rem;
        margin: auto;
    }
    .content.right {
        position: relative;
        width: 40%;
        min-width: 440px;
        margin: auto;
    }
    .floating-panel {
        padding: 3rem;
        width: 100%;
        max-width: 300px;
        h2 {
            margin: 0 0 1rem 0;
            font-size: 2rem;
        }
        box-shadow: 15px 15px 50px #131313;
        opacity: 0;
        transition-duration: 1s;
        transition-timing-function: ease-out;
    }
    .floating-panel:hover {
        transform: scale(1.03) !important;
    }
    .on-top {
        background-color: #3454D1;
        transform: translate(50px, 20px);
    }
    .on-middle {
        background-color: #98C1D9;
        color:#222222;
        transform: translateX(90px);
    }
    .on-bottom {
        background-color: #6969B3;
        transform: translate(65px, -20px);
    }

    .start-container {
        width: 100%;
        margin: 0 auto auto;
        padding: 4rem 0;
        align-self: flex-end;
        .start {
            display: flex;
            justify-content: center;
            align-content: center;
            margin: auto;
            padding: 1rem;
            width: 440px;
            background-color: #eee;
            color: #222;
            font-size: 2em;
            box-shadow: 15px 15px 30px #131313;
            border-radius: 25px;
            opacity: 0;
            transition-duration: 0.6s;
            transition-timing-function: ease-out;
        }
        .start:hover {
            cursor: pointer;
            color: #eee;
            background-color: #3454D1;
            transform: translateY(5px);
        }
    }

    .cover {
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        opacity: 0;
        z-index: 10;
    }
`

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.titleText = React.createRef();
        this.titleSubText = React.createRef();
    }

    componentDidMount () {
        (new TimelineMax())
            .to(this.titleText.current, 1, {
                y: 0,
                opacity: 1,
                ease: Bounce.easeOut
            })
            .to(this.titleSubText.current, 2, {
                y: 0,
                opacity: 1,
                ease: Power2.easeOut
            }).to(".on-top", 0, {
                x: 0,
                opacity: 1,
                scale: 1,
            }, "-=1.3").to(".on-middle", 0, {
                x: 40,
                opacity: 1,
                scale: 1,
            }, "-=1.15").to(".on-bottom", 0, {
                x: 10,
                opacity: 1,
                scale: 1,
            }, "-=1").to(".start", 0, {
                opacity: 1,
            }).to(".cover", 0, { display: "none" });
    }

    handleStart () {
        (new TimelineMax())
            .to(".home > div", 1, {
                opacity: 0,
                y: "-=30",
                ease: Power2.easeOut
            }).add(e => {
                this.props.history.push('/app');
            });
    }

    render () {
        return (
            <HomeStyled className="home">
                <div className="cover" />
                <div className="left content">
                    <h1 ref={this.titleText} className="titleText">Vroom.</h1>
                    <p ref={this.titleSubText} className="titleSubText">Your #1 virtual vehicle storage solution</p>
                </div>
                <div className="right content">
                    <div className="floating-panel on-top">
                        <h2>KEEP TRACK</h2>
                        <p>We keep track of every single vehicle entering the storage. Never lose track of your vehicles.</p>
                    </div>
                    <div className="floating-panel on-middle">
                        <h2>CLOUD SOLUTION</h2>
                        <p>100% cloud-based solution. Centralize all your data in the cloud and access them anywhere, anytime.</p>
                    </div>
                    <div className="floating-panel on-bottom">
                        <h2>KEVIN JEONG</h2>
                        <p>Is the creator of this thing. Created with react.js, mongoDB, and Spring Boot.</p>
                    </div>
                </div>
                <div className="start-container">
                    <div className="start" type="button" onClick={e => { this.handleStart() }}>START</div>
                </div>
            </HomeStyled>
        );
    }
}
