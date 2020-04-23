import React, { Component } from 'react';
import DeviceType from './DeviceType';
import PlantType from './PlantType';
import StoppageClasses from './StoppageClasses';
import ConsumptionClasses from './ConsumptionClasses';
import GradeData from './GradeData';

import { Layout, Menu, Breadcrumb, Button, Modal, Input, Icon, Drawer, Switch } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined, AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons';
import RestAPI from '../api';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';
import './Layout.css';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLayout extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight - 160,
            types: [],
            type: '1',
            // selectedDeviceType: '',
            plantTypes: [ 'BAR MILL', 'WIRE ROD MILL', 'BAR + WIRE ROD MILL', 'GARRET LINE' ],
            plantType: '',
            stoppageClasses: [ 'ELECTRICAL', 'MECHENICAL', 'PROCESS' ],
            stoppage: '',
            consumptionClasses: [ 'POWER', 'WATER', 'GAS' ],
            consumer: '',
            grpNames: ['Group 1', 'Group 2', 'Group 3'],
            grpName: '',
            grpTypes: ['LO CARBON - Desc', 'MILD STEEL - Desc', 'HARD STEEL - Desc'],
            grpType: '',
            gradeNames: ['XYZ1', 'XYZ2', 'XYZ3'],
            gradeName: '',
            gradeGears: ['GRP! LO C'],
            gradeGear: '',
            gradeCodes: ['231', '235', '234'],
            gradeCode: '',
            descriptions: ['Test', 'Test', 'Test'],
            desc: '',
            collapsed: false,
            theme: 'dark',
        }
    }

    componentDidMount() {
        this.getDeviceaTypes();
        let submenu = document.getElementsByClassName('ant-menu-submenu-title');
        if (submenu) {
            let menus = Array.from(submenu);
            menus.forEach(menu => {
                menu.style.margin = 0;
            });
        }
    }
    getDeviceaTypes = () => {
        RestAPI.getDeviceaTypes()
            .then(res => {
                let types = [];
                if (res && res.data) {
                    this.setState({ types: res.data });
                    // types = res.data.map(data => {
                    //     return data.Name + ' - ' + data.Description
                    // })
                }
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }
    // handeMenu = (type, e) => {
    //     console.log(type, e);
    //     this.setState({ type });
    // }

    onChange = (type, value, e) => {
        this.setState({ [type]: value });
        console.log(value)
    }
    selected = ({ item, key, keyPath, selectedKeys, domEvent }) => {
        console.log(item, key );
        this.setState({ type: key})
    }

    toggleCollapsed = () => {
        this.setState(prevState => ({ collapsed: !prevState.collapsed }));
    };

    changeTheme = value => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    };
    
    render() {
        return(
            <div style={{ height: this.state.height, 'backgroundColor': '#ececec' }}>
                <div style={{ height: 'inherit', display: 'flex', overflowY: 'scroll'}}>
                    <div style={{ width: this.state.collapsed ? 82 : 256 }}>
                        <div className='buttons'>
                            <Button type="primary" onClick={this.toggleCollapsed}>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
                            </Button>
                            <Switch
                                checked={this.state.theme === 'dark'}
                                onChange={this.changeTheme}
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                                style={{marginTop: '5px'}}
                            />
                        </div>
                        <Menu
                            onSelect={this.selected}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            mode="inline"
                            theme={this.state.theme}
                            inlineCollapsed={this.state.collapsed}
                        >
                            <Menu.Item key="1">
                                <PieChartOutlined />
                                <span>Master Data</span>
                            </Menu.Item>
                            <SubMenu
                                key="sub1"
                                title={
                                <span>
                                    <MailOutlined />
                                    <span>Settings</span>
                                </span>
                                }
                            >
                                <Menu.Item key="5">Plant Data</Menu.Item>
                                <Menu.Item key="6">Grade Data</Menu.Item>
                                <Menu.Item key="7">Consumption Data</Menu.Item>
                                <Menu.Item key="8">Stoppage Data</Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                <span>
                                    <AppstoreOutlined />
                                    <span>Project Data</span>
                                </span>
                                }
                            >
                                <Menu.Item key="9">Option 9</Menu.Item>
                                <Menu.Item key="10">Option 10</Menu.Item>
                                <SubMenu key="sub3" title="Submenu">
                                    <Menu.Item key="11">Option 11</Menu.Item>
                                    <Menu.Item key="12">Option 12</Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            <Menu.Item key="2">
                                <PieChartOutlined />
                                <span>Recipe table</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <PieChartOutlined />
                                <span>Production Plan</span>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <PieChartOutlined />
                                <span>Stoppage Management</span>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <PieChartOutlined />
                                <span>Consumption Management</span>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <PieChartOutlined />
                                <span>Reports</span>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <PieChartOutlined />
                                <span>Crew and Shift Management</span>
                            </Menu.Item>
                            <Menu.Item key="8">
                                <PieChartOutlined />
                                <span>User management</span>
                            </Menu.Item>
                            <Menu.Item key="9">
                                <PieChartOutlined />
                                <span>HMI Overview</span>
                            </Menu.Item>
                        </Menu>
                    </div>
                    <div style={{ padding: '1rem 0', 'backgroundColor': '#ececec', width: '100%' }}>
                        { this.state.type === '1' && <DeviceType self={this} /> }
                        { this.state.type === 'plantData' && <PlantType self={this} /> }
                        { this.state.type === 'gradeData' && <GradeData self={this} /> }
                        { this.state.type === 'stoppage' && <StoppageClasses self={this} /> }
                        { this.state.type === 'consumption' && <ConsumptionClasses self={this} /> }
                    </div>
                </div>
            </div>
        );
    }
}

export class Buttons extends Component{
    constructor() {
        super();
        this.state = {
            type: 'Add',
            input: '',
            open: false,
            prevVal: ''
        }
    }

    openModal = (value, e) => {
        let parentThis = this.props.self;

        if (value === 'Delete' && this.props.type == 'Device') {
            parentThis.deleteDevice(parentThis.props.self.state.key);
            parentThis.setState({ DeviceType: '' });
            return
        }

        if (value === 'Edit') {
            if (this.props.type === 'Device') {
                let prevVal = parentThis.props.self.state.types.find(type => type.Id === +parentThis.props.self.state.key).Name;
                this.setState({ input: prevVal, prevVal });
            }
        }
        this.setState({ type: value, open: true });
    }

    handleCRUD = () => {
        let parentThis = this.props.self;
        let ip = this.state.input;
        if (this.props.type === 'Plant Type') {
            let plantTypes = [...parentThis.state.plantTypes];
            if (this.state.type === 'Add' && ip) {
                plantTypes.push(this.state.input);
                parentThis.setState({ plantTypes });
            }
            if (this.state.type === 'Delete' && ip) {
                plantTypes = plantTypes.filter(type => type !== ip);
                parentThis.setState({ plantTypes })
            }
        }
        if (this.props.type === 'Device') {
            let types = [...parentThis.props.self.state.types];
            if (this.state.type === 'Add' && ip) {
                types.push(this.state.input);
                parentThis.addDevice(this.state.input);
                // parentThis.props.self.setState({ types });
            }
            if (this.state.type === 'Edit' && ip) {
                parentThis.editDevice(parentThis.props.self.state.key, ip);
                // types = types.filter(type => type.Name !== this.state.prevVal);
                // parentThis.props.self.setState({ types });
            }
        }
        if (this.props.type === 'Stoppage Classes') {
            let stoppageClasses = [...parentThis.state.stoppageClasses];
            if (this.state.type === 'Add' && ip) {
                stoppageClasses.push(this.state.input);
                parentThis.setState({ stoppageClasses });
            }
            if (this.state.type === 'Delete' && ip) {
                stoppageClasses = stoppageClasses.filter(type => type !== ip);
                parentThis.setState({ stoppageClasses })
            }
        }
        if (this.props.type === 'Consumer Classes') {
            let consumptionClasses = [...parentThis.state.consumptionClasses];
            if (this.state.type === 'Add' && ip) {
                consumptionClasses.push(this.state.input);
                parentThis.setState({ consumptionClasses });
            }
            if (this.state.type === 'Delete' && ip) {
                consumptionClasses = consumptionClasses.filter(type => type !== ip);
                parentThis.setState({ consumptionClasses })
            }
        }

        this.setState({ open: false, input: '' });
    }

    handleInput = (e) => {
        this.setState({ input: e.target.value });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        return(
            <>
                <div style={{ padding: '12px 0'}}>
                    <Button onClick={this.openModal.bind(this, 'Add')} type='primary'>Add</Button>
                    {/* <Button size='small' onClick={this.openModal.bind(this, 'Copy')} type='primary'>Copy</Button> */}
                    <Button onClick={this.openModal.bind(this, 'Edit')} type='primary'>Edit</Button>
                    <Button onClick={this.openModal.bind(this, 'Delete')} type='danger'>Delete</Button>
                </div>
                <Modal
                    title={this.props.type}
                    visible={this.state.open}
                    onCancel={this.handleClose}
                    footer={null}
                >
                    <div>
                        <Input placeholder='Type Here' onChange={this.handleInput} value={this.state.input} />
                        <Button onClick={this.handleCRUD}>{this.state.type}</Button>
                    </div>
                </Modal>            
            </>
        );
    }
}

export default MainLayout;