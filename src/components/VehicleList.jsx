import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Modal from 'react-modal';

import Vehicle from './Vehicle';

const VehicleListStyled = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;

    .top-p {
        flex-shrink: 0;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: 1rem 0 2rem;
        overflow: hidden;
        .vl_btn {
            box-shadow: 15px 15px 50px #131313;
            width: 120px;
            padding: 1rem;
            background-color: #3454D1;
            display: flex;
            justify-content: center;
            align-content: center;
            margin-right: 1.2rem;
            margin-top: 1.2rem;
            transition-duration: 0.2s;
            transition-timing-function: ease-out;
        }
        .vl_btn:hover {
            cursor: pointer;
            transform: rotateZ(7deg) scale(1.03);
            background-color: #eee;
            color: #222;
        }
    }

    .bottom-p {
        justify-content: center;
        height: calc(100% - 123.19px);
        overflow-y: auto;
        width: 100%;
        ::-webkit-scrollbar { 
            display: none; 
        }
        .list-container {
            display: flex;
            flex-wrap: wrap;
        }
    }
`

const modalStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%,-50%)',
    },
    overlay: {
        backgroundColor: 'rgba(85, 85, 85, 0.55)'
    }
}

export default class VehicleList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            vehicles: [],
            modalOpen: false,
            modalSearch: false,
            year: '',
            make: '',
            model: ''
        };
        this.list = React.createRef();
    }

    componentDidMount () {
        axios.defaults.baseURL = 'http://localhost:8080/vehicle';
        Modal.setAppElement(this.list.current);
        this.getList();
    }

    openModal = (e) => {
        this.setState({ modalSearch: e === "search", modalOpen: true });
    }
    closeModal = (e) => {
        this.setState({ modalOpen: false });
    }

    getList (year = null, make = null, model = null) {
        if (year || make || model) {
            axios.get('/find', {
                params: {
                    year: year,
                    make: make,
                    model: model
                }
            }).then(result => {
                this.setState({ vehicles: result.data });
            });
        } else {
            axios.get('/').then(result => {
                this.setState({ vehicles: result.data });
            });
        }
    }

    handleSearch (e) {
        if(!this.state.year && !this.state.make && !this.state.model) {
            alert("Please fill in at least one criteria.");
        } else {
            this.getList(this.state.year, this.state.make, this.state.model);
            this.closeModal();
        }
    }

    handleAdd (e) {
        if(this.state.year < 1950 || this.state.year > 2050) {
            alert("The year must be in between 1950 and 2050.");
        } else if(!this.state.make || !this.state.model) {
            alert("Make and Model must be specified.");
        } else {
            axios.post('/', {
                year: this.state.year,
                make: this.state.make,
                model: this.state.model
            }).then(res => {
                this.closeModal();
                this.getList();
            });
        }
    }
    handleNumChange (e) {
        this.setState({year: e.target.value});
    }

    handleTextChange (e) {
        if (e.target.name === "make") {
            this.setState({make: e.target.value});
        } else {
            this.setState({model: e.target.value});
        }
    }

    render () {
        return (
            <VehicleListStyled ref={this.list}>
                <div className="top-p">
                    <div type="button" onClick={e => this.openModal("search")} name="search" className="filter-container vl_btn">
                        Search Vehicle
                    </div>
                    <div type="button" onClick={e => this.openModal("add")} className="add-container vl_btn">
                        Add Vehicle
                    </div>
                    <div type="button" onClick={e => {this.getList()}} className="refresh-container vl_btn">
                        Reset List
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel={this.state.modalSearch ? "Search For Vehicles" : "Add New Vehicle"}
                >
                    <h1>{this.state.modalSearch ? "Search for Vehicles" : "Add New Vehicle"}</h1>
                    <div className="modal_content">
                        <div className="labels">
                            <label>Year:</label>
                            <label>Make:</label>
                            <label>Model:</label>
                        </div>
                        <form className="inputs">
                            <input onChange={this.handleNumChange.bind(this)} type="number" name="year" value={this.state.year} />
                            <input onChange={this.handleTextChange.bind(this)} type="text" name="make" value={this.state.make} />
                            <input onChange={this.handleTextChange.bind(this)} type="text" name="model" value={this.state.model} />
                        </form>
                    </div>
                    <div className="modal-submit-container">
                        {this.state.modalSearch ? (
                            <div type="submit" onClick={this.handleSearch.bind(this)} className="modal-submit">Search</div>
                        ) : (
                            <div type="submit" onClick={this.handleAdd.bind(this)} className="modal-submit">Add</div>
                        )}
                    </div>
                </Modal>
                <div className="bottom-p">
                    <div className="list-container">
                        {this.state.vehicles.length > 0 ?
                            this.state.vehicles.map(vehicle => <Vehicle key={vehicle.id} data={vehicle} updater={this.getList.bind(this)} />)
                            : "No vehicles found."}
                    </div>
                </div>
            </VehicleListStyled>
        );
    }
}