import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// import { TimelineMax, Power2, Bounce } from 'gsap/umd/TweenMax';

import Vehicle from './Vehicle';

const VehicleListStyled = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%;

    .top-p {
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        padding: 2rem;
    }

    .bottom-p {
        justify-content: center;
        .list-container {
            display: flex;
            flex-wrap: wrap;
        }
    }
`

export default class VehicleList extends Component {
    state = {
        vehicles: []
    };

    // constructor (props) {
    //     super(props);
    // }

    componentDidMount () {
        axios.defaults.baseURL = 'http://localhost:8080/vehicle';
        this.getList();
    }

    getList(year = null, make = null, model = null) {
        console.log("Updating list...");
        if (year || make || model) {
            axios.get('/find', {
                year: year,
                make: make,
                model: model
            }).then(result => {
                this.setState({ vehicles: result.data });
            });
        } else {
            axios.get('/').then(result => {
                this.setState({ vehicles: result.data });
            });
        }
    }

    render () {
        return (
            <VehicleListStyled>
                <button type="button" onClick={e => this.getList()}>Get List</button>
                <div className="top-p">
                    <div className="filter-container">
                        Search stuff
                    </div>
                    <div className="add-conta stuner">
                        Add stuff
                    </div>
                    <div className="refresh-container">
                        Refresh the list
                    </div>
                </div>
                <div className="bottom-p">
                    <div className="list-container">
                        {this.state.vehicles.map(vehicle => <Vehicle key={vehicle.id} data={vehicle} updater={this.getList.bind(this)} />)}
                    </div>
                </div>
            </VehicleListStyled>
        );
    }
}