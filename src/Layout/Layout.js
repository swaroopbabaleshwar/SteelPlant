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
import { Button, Col, Switch as Swh } from 'antd';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class CustomLayout extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight - 100,
            key: 1,
            open: false,
            theme: 'light',
        }
    }

    changeTab = (key, e) => {
        this.setState({ key });
    }
    handleHeader = () => {
        this.setState(prevState => {
            return ({ open: !prevState.open });
        } );
    }

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };

    render() {
        return(
            <>
                <Router>
                    <div style={{ position: 'fixed', top: '0', width: '100%', zIndex: '1' }}>
                        {this.state.open && <CustomHeader>
                            <>
                                <Swh
                                    checked={this.state.theme === 'dark'}
                                    onChange={this.changeTheme}
                                    checkedChildren="Dark"
                                    unCheckedChildren="Light"
                                    style={{marginTop: '5px'}}
                                />
                            </>
                            </CustomHeader>}
                        <div className='headerData'>
                            {/* <div style={{ width: '100%', height: '80px', 'background': 'green'}}></div> */}
                            <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', margin: '0 50px'}}>
                                <Button type='primary' onClick={this.handleHeader} >Header</Button>
                            </Col>
                        </div>
                    </div>

                    <div>
                        <CustomPages contentHeight={window.innerHeight - (375 + (this.state.open ? 94 : 0))} header={80 + (this.state.open ? 94 : 0)} theme={this.state.theme} collapsed={this.state.collapsed} >
                        </CustomPages>
                    </div>
                    
                    <div className='footer'><Footer /></div>
                </Router>
            </>
        );
    }
}

export default CustomLayout;