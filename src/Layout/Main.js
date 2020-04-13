import React, { Component } from 'react';
import DeviceType from './DeviceType';
import PlantType from './PlantType';
import StoppageClasses from './StoppageClasses';
import ConsumptionClasses from './ConsumptionClasses';
import GradeData from './GradeData';

import { Layout, Menu, Breadcrumb, Button, Modal, Input } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import RestAPI from '../api';
import { responsiveArray } from 'antd/lib/_util/responsiveObserve';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class MainLayout extends Component {
    constructor() {
        super();
        this.state = {
            height: window.innerHeight - 160,
            types: [],
            type: 'device',
            selectedDeviceType: '',
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
            desc: ''
        }
    }

    componentDidMount() {
        this.getDeviceaTypes();
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
    handeMenu = (type, e) => {
        console.log(type, e);
        this.setState({ type });
    }

    onChange = (type, value, e) => {
        this.setState({ [type]: value });
        console.log(value)
    }

    render() {
        return(
            <div style={{ height: this.state.height, 'backgroundColor': '#f4f4f4' }}>
                <Layout style={{ height: 'inherit'}}>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: 'inherit',overflowY: 'scroll', borderRight: 0 }}
                        >
                            <SubMenu key="sub1" title={ <span> MASTER DATA </span>} >
                                <Menu.Item key="1" onClick={this.handeMenu.bind(this, 'device')}>Devices</Menu.Item>
                                <SubMenu key='settings' title='Settings' >
                                    <Menu.Item key="2" onClick={this.handeMenu.bind(this, 'plantData')}>Plant Data</Menu.Item>
                                    {/* <Menu.Item key="3" onClick={this.handeMenu.bind(this, 'productData')}>Product Data</Menu.Item> */}
                                    <Menu.Item key="4" onClick={this.handeMenu.bind(this, 'gradeData')}>Grade Data</Menu.Item>
                                    <Menu.Item key="6" onClick={this.handeMenu.bind(this, 'consumption')}>Consumption Data</Menu.Item>
                                    <Menu.Item key="7" onClick={this.handeMenu.bind(this, 'stoppage')}>Stoppage Data</Menu.Item>
                                </SubMenu>
                            </SubMenu>

                            <SubMenu key="project Data" title={ <span> Project Data </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>

                            <SubMenu key="Recipe Table" title={ <span> Recipe table </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>

                            <SubMenu key="Production Plan" title={ <span> Production Plan </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>

                            <SubMenu key="Stoppage Management" title={ <span> Stoppage Management </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>

                            <SubMenu key="Consumption Management" title={ <span> Consumption Management </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="Reports" title={ <span> Reports </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="Crew and Shift Management" title={ <span> Crew and Shift Management </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="User management" title={ <span> User management </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="HMI Overview" title={ <span> HMI Overview </span>} >
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '1rem 0' }}>
                        { this.state.type === 'device' && <DeviceType self={this} /> }
                        { this.state.type === 'plantData' && <PlantType self={this} /> }
                        { this.state.type === 'gradeData' && <GradeData self={this} /> }
                        { this.state.type === 'stoppage' && <StoppageClasses self={this} /> }
                        { this.state.type === 'consumption' && <ConsumptionClasses self={this} /> }
                    </Layout>
                </Layout>
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

        if (this.state.type === 'Delete' && this.props.type == 'Device') {
            return parentThis.deleteDevice(parentThis.props.self.state.key);
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
                <div className='buttons'>
                    <Button size='small' onClick={this.openModal.bind(this, 'Add')} type='primary'>Add</Button>
                    {/* <Button size='small' onClick={this.openModal.bind(this, 'Copy')} type='primary'>Copy</Button> */}
                    <Button size='small' onClick={this.openModal.bind(this, 'Edit')} type='primary'>Edit</Button>
                    <Button size='small' onClick={this.openModal.bind(this, 'Delete')} type='danger'>Delete</Button>
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