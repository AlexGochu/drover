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
    
    onSelect = (search_param) => (option)=> {
        this.setState({ search_params: {...this.state.search_params, [`${search_param}`]: option.value }}, ()=> this.axiosPostWrapper());
    };

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
    typeOptions = ['Consumer','PCO'];
    elementsPerPage = [
        {value: 10, label: '10'}, 
        {value: 20, label: '20'},
        {value: 30, label: '30'},
        {value: 50, label: '50'},
        {value: 100, label: '100'}
    ];
    render() {
        const defaulTypeOption = this.typeOptions[this.typeOptions.indexOf(this.state.search_params.vehicle_type)];
        const defaultPerPage = this.elementsPerPage[this.elementsPerPage.indexOf(this.elementsPerPage.find(el => el.value === this.state.search_params.per_page))];
        return (
            <div style={{margin: 20}}>
                <div style={{display: 'block'}}>
                   
                        <Dropdown options={this.typeOptions} onChange={this.onSelect('vehicle_type')} value={defaulTypeOption} />
                  
                        <Dropdown options={this.elementsPerPage} onChange={this.onSelect('per_page')} value={defaultPerPage} />
                    

                </div>

                <div style={{display: 'block'}}>
                    {
                        this.state.data && this.state.data.data.map(el => 
                                (<li key={el.id}>{`${el.vehicle_make} - ${el.vehicle_model} - ${el.reference_owner_price_pence ? el.reference_owner_price_pence/100 : "empty option"}`}</li>)
                            )
                    }
                </div>
            </div>
        );
    };
}

export default DroverSearch;