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
import styles from './Layout.css';

import Footer from '../components/footer/Footer';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class CustomLayout extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight - 160,
            key: 1,
            selectedDeviceType: ''
        }
    }

    changeTab = (key, e) => {
        this.setState({ key });
    }


    render() {
        return(
            <>
                <Router>
                    <div>
                        <CustomHeader />
                    </div>

                    <div>
                        <CustomPages />
                        {/* <div style={{ height: this.state.height, 'backgroundColor': '#f4f4f4' }} className=''> */}
                            {/* <Switch>
                                <Route path={"/"} exact component={MasterData} />
                                <Route path={"/plantdata"} component={PlantData} />
                                <Route path={"/productionplan"} component={ProductionPlan} />
                                <Route path={"/storagemanagement"} component={StorageManagement} />
                                <Route path={"/consumptionmanagement"} component={ConsumptionManagement} />
                                <Route path={"/hmioverview"} component={HMIOverview} />
                                <Route path={"/recipetable"} component={RecipeTable} />
                            </Switch> */}
                            {/* <div className="navbar backImage" >
                                <div className={this.state.key === '1' ? 'active': null} onClick={this.changeTab.bind(this, '1')}>Master Data</div>
                                <div className={this.state.key === '2' ? 'active': null} onClick={this.changeTab.bind(this, '2')}>Plant Data</div>
                                <div className={this.state.key === '3' ? 'active': null} onClick={this.changeTab.bind(this, '3')}>PRODUCTION PLAN</div>
                                <div className={this.state.key === '4' ? 'active': null} onClick={this.changeTab.bind(this, '4')}>RECIPE TABLE</div>
                                <div className={this.state.key === '5' ? 'active': null} onClick={this.changeTab.bind(this, '5')}>STOPPAGE MANAGEMENT</div>
                                <div className={this.state.key === '6' ? 'active': null} onClick={this.changeTab.bind(this, '6')}>CONSUMPTION MANAGEMENT</div>
                                <div className={this.state.key === '7' ? 'active': null} onClick={this.changeTab.bind(this, '7')}>HMI OVERVIEW</div>
                            </div>
                            <div style={{height: '96%'}}>
                                {this.state.key === '1' && <MasterData self={this} />}
                                {this.state.key === '2' && <PlantData />}
                                {this.state.key === '3' && <ProductionPlan />}
                                {this.state.key === '4' && <StorageManagement />}
                                {this.state.key === '5' && <ConsumptionManagement />}
                                {this.state.key === '6' && <HMIOverview />}
                                {this.state.key === '7' && <RecipeTable />}
                            </div>
                        </div> */}
                    </div>
                    
                    <div className='footer'><Footer /></div>
                </Router>
            </>
        );
    }
}

export default CustomLayout;