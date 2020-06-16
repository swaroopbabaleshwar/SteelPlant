import React, { Component } from 'react';
import logoAIC from '../../assets/logoAIC.png';
import customerLogo from '../../assets/customerLogo.png';
import MasterData from '../Tabs/MasterData';
import { Button } from 'antd';
import { Row, Col } from 'antd';

import styles from './header.css';
import { NavLink } from "react-router-dom";

import { Tabs } from 'antd';
const { TabPane } = Tabs;

const style = {}
class Header extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    render() {
        return(
            <>
                {/* <Row> */}
                    <Row>
                        <Col span={4}>
                            <img style={{ width: '100%', height: '80px'}} src={logoAIC} alt={'Logo'} />
                        </Col>
                        <Col span={13}></Col>
                        <Col span={4}>
                            <img style={{ width: '100%', height: '80px'}} src={customerLogo} alt='Customer Logo' />
                        </Col>
                        <Col span={3}>
                            <Button type='primary'>Logout</Button>
                            {this.props.children}
                        </Col>
                    </Row>
                {/* </Row> */}
            </>
        );
    }
}

export default Header;