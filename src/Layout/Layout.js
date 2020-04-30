import React, { Component } from 'react';
import CustomHeader from '../components/logoinPage/Header';
import CustomPages from './Main';
import MasterData from '../components/Tabs/MasterData';
import PlantData from '../components/Tabs/PlantData';
import ProductionPlan from '../components/Tabs/ProductionPlan';
import StorageManagement from '../components/Tabs/StorageManagement';
import ConsumptionManagement from '../components/Tabs/ConsumptionManagement';
import HMIOverview from '../components/Tabs/HMIOverview';
import RecipeTable from '../components/Tabs/RecipeTable';
import styles from './Layout.less';

import Footer from '../components/footer/Footer';
import { Button, Col } from 'antd';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class CustomLayout extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight - 160,
            key: 1,
            open: false
        }
    }

    changeTab = (key, e) => {
        this.setState({ key });
    }
    handleHeader = () => {
        this.setState(prevState => ({ open: !prevState.open }));
    }


    render() {
        return(
            <>
                <Router>
                    <div>
                        <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 50px'}}>
                            <Button type='primary' onClick={this.handleHeader} >Header</Button>
                        </Col>
                        {this.state.open && <CustomHeader />}
                    </div>

                    <div>
                        <CustomPages />
                    </div>
                    
                    <div className='footer'><Footer /></div>
                </Router>
            </>
        );
    }
}

export default CustomLayout;