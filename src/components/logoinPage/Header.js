import React, { Component } from 'react';
import logoAIC from '../../assets/logoAIC.png';
import customerLogo from '../../assets/customerLogo.png';
import MasterData from '../Tabs/MasterData';

import styles from './header.css';
import { NavLink } from "react-router-dom";

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const style = {}
class Header extends Component {
    constructor() {
        super();
    }

    // callback = (key) => {
    //     this.setState({ key });
    // }

    render() {
        return(
            <>
                <div style={{'display': 'flex', 'height': '100px'}}>
                    <img src={logoAIC} alt={'Logo'} />
                    <div style={{'width': '80%', 'backgroundColor': '#0b790b', 'display': 'flex', 'justifyContent': 'flex-end'}}>
                        <img src={customerLogo} alt='Customer Logo' />
                    </div>
                </div>
                <div>
                    {/* <div className="navbar backImage">
                        <ul>
                            <li>
                                <NavLink to="/" exact>MASTER DATA</NavLink>
                            </li>
                            <li>
                                <NavLink to="/plantdata" exact>PLANT DATA</NavLink>
                            </li>
                            <li>
                                <NavLink to="/productionplan" exact>PRODUCTION PLAN</NavLink>
                            </li>
                            <li>
                                <NavLink to="/recipetable" exact>RECIPE TABLE</NavLink>
                            </li>
                            <li>
                                <NavLink to="/storagemanagement" exact>STOPPAGE MANAGEMENT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/consumptionmanagement" exact>CONSUMPTION MANAGEMENT</NavLink>
                            </li>
                            <li>
                                <NavLink to="/hmioverview" exact>HMI OVERVIEW</NavLink>
                            </li>
                        </ul>
                    </div> */}
                    {/* <div className="navbar backImage">
                        <Tabs defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="Tab 1" key="1">
                                <MasterData />
                            </TabPane>
                            <TabPane tab="Tab 2" key="2">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="Tab 3" key="3">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </div> */}
                </div>
            </>
        );
    }
}

export default Header;