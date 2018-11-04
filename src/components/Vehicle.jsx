import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import { TimelineMax, Power2, Bounce } from 'gsap/umd/TweenMax';

const VehicleStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    background-color: #eee;
    color: #222;
    margin: 0.5rem;
    width: 332.609px;
    .top {
        display: flex;
        justify-content: space-between;
        .cols {
            display: flex;
            flex-direction: column;
            padding: 0.5rem;
            label, div {
                padding: 0.2rem;
            }
            input {
                width: 224.953px;
                height: 24px;
            }
        }
        .labels {
            background-color: #3454D1;
            color: #eee;
        }
    }
    .bot {
        display: flex;
        .button {
            display: flex;
            align-content: center;
            justify-content: center;
            width: 100%;
            padding: 0.4rem;
        }
        .button:hover {
            cursor: pointer;
        }
        .update {
            background-color: #98C1D9;
        }
        .delete {
            background-color: #6969B3;
        }
    }
`

export default class Vehicle extends Component {
    constructor (props) {
        super(props);
        this.state = {
            tempData: {},
            editing: false,
            id: '',
            year: 0,
            make: '',
            model: ''
        }
    }

    componentDidMount () {
        this.setState(this.props.data);
    }

    componentDidUpdate (pp, ps, ss) {
        pp.data !== this.props.data && this.setState(this.props.data);
    }

    update () {
        this.setState({ editing: true, tempData: {year: this.state.year, make: this.state.make, model: this.state.model} });
    }

    confirmUpdate () {
        axios.post('/', {
            id: this.state.id,
            year: this.state.year,
            make: this.state.make,
            model: this.state.model
        }).then(res => {
            this.props.updater();
            this.setState({ editing: false });
        })
    }

    cancelUpdate () {
        this.setState({ editing: false });
        this.setState(this.state.tempData);
    }

    delete () {
        axios.delete('/' + this.props.data.id).then(res => {
            this.props.updater();
        });
    }

    handleIntChange (e) {
        this.setState({ year: e.target.value });
    }
    handleTextChange (e) {
        if (e.target.name === "make") {
            this.setState({ make: e.target.value });
        } else {
            this.setState({ model: e.target.value });
        }
    }

    render () {
        return (
            <VehicleStyled>
                <div className="top">
                    <div className="cols labels">
                        <label>Id: </label>
                        <label>Year: </label>
                        <label>Make: </label>
                        <label>Model: </label>
                    </div>
                    {this.state.editing ? (
                        <div className="cols properties">
                            <input disabled value={this.props.data.id} />
                            <input type="number" name="year" onChange={e => this.handleIntChange(e)} value={this.state.year} />
                            <input type="text" name="make" onChange={e => this.handleTextChange(e)} value={this.state.make} />
                            <input type="text" name="model" onChange={e => this.handleTextChange(e)} value={this.state.model} />
                        </div>
                    ) : (
                        <div className="cols properties">
                            <div>{this.props.data.id}</div>
                            <div>{this.state.year}</div>
                            <div>{this.state.make}</div>
                            <div>{this.state.model}</div>
                        </div>
                    )}
                </div>
                {this.state.editing ?
                    (
                        <div className="bot">
                            <div onClick={e => this.confirmUpdate()} className="button update">
                                Confirm
                            </div>
                            <div onClick={e => this.cancelUpdate()} className="button delete">
                                Cancel
                            </div>
                        </div>
                    ) : (
                        <div className="bot">
                            <div onClick={e => this.update()} className="button update">
                                Update
                            </div>
                            <div onClick={e => this.delete()} className="button delete">
                                Delete
                            </div>
                        </div>
                    )}
            </VehicleStyled>
        );
    }
}