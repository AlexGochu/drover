import React, {Component} from 'react';
import {BASE_URL, HEADERS_JSON} from '../utils/constants';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import axios from 'axios';
//import _ from 'lodash';

class DroverSearch extends Component {
    state = {
        baseUrl: "https://app.joindrover.com/api/web/vehicles",
        search_params: {
            per_page: 10,
            order_by: "price",
            order_direction: "asc",
            page: 1,
            vehicle_type: 'Consumer',
        },
        data: null,
       
    };
    
    _onSelect = (option)  => {
        this.setState({ search_params: {...this.state.search_params, vehicle_type: option.value }}, ()=> this.axiosPostWrapper());
    }
    componentDidMount() {
        this.axiosPostWrapper();
    }
    axiosPostWrapper = () => {
        const search_data = {...this.state.search_params};

        const axiosConfig = {
            method: 'post',
            url: BASE_URL,
            headers: HEADERS_JSON,
            data: search_data
        };
       
        axios.request(axiosConfig).then( res => {
            this.setState({data: res.data});
        });
    }
    options = ['Consumer','PCO'];
    render() {
        const defaultOption = this.options[this.options.indexOf(this.state.search_params.vehicle_type)];
        return (
            <div>
                <Dropdown options={this.options} onChange={this._onSelect} value={defaultOption} />
                <div style={{display: 'block'}}>
                    {
                        this.state.data && this.state.data.data.map(el => 
                                (<li key={el.id}>{`${el.vehicle_make} - ${el.vehicle_model}`}</li>)
                            )
                    }
                </div>
            </div>
        );
    };
}

export default DroverSearch;