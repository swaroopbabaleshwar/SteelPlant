import React, { Component } from 'react';
import RestAPI from '../api';

import { Buttons } from './Main';
import MasterTable from './EditableTable';

import { Row, Col, Card, Select, Button, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;

class DeviceType extends Component {
    constructor(props) {
        super();
        this.state = {
            // types: [{ type: 'STAND', desc: 'stand' },
            //         {type: 'PR', desc: 'PinchRoll'},
            //         {type: 'SH', desc: 'shear'},
            //         {type: 'TB', desc: 'TailBreaker'}
            //     ],
			selectedDeviceType: '',
			key: '',
			type: '',
			input: '',
			fieldType: {},
			fieldTypes: []
        }
    }

    onChange = (type, key, e) => {
		if (type === 'fieldType') {
			this.setState({ fieldType: {Id: e.key, Name: e.value} });
			return;
		}
		let parentThis = this.props.self;
        let index =  e.children.indexOf(' ');
		this.setState({ selectedDeviceType: e.children.substr(0, index), key });
		parentThis.setState({ selectedDeviceType: e.children.substr(0, index), key });
	}
	
	componentDidMount() {
		this.getFieldTypes();
	}

	getFieldTypes = () => {
		RestAPI.getFieldTypes()
        .then(resp => {
            if (resp && resp.data) {
				this.setState({ fieldTypes: resp.data, input: '', type: '', fieldType: {Id: '', Name: ''} });
			}
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
	}

	addDevice = (device) => {
		RestAPI.addDeviceType({
			params: {
				name: device
			}
		}).then(resp => {
			console.log(resp);
			this.props.self.getDeviceaTypes();
		}).catch(err => {
			console.log(err);
		});
	}

	addDeviceparameterList = (item) => {
		RestAPI.addDeviceparameters({
			params: {
				...item
			}
		});
		// RestAPI.addDeviceParameters({
		// 	params: {
		// 		...item
		// 	}
		// }).then(resp => {
		// 	console.log(resp);
		// }).catch(err => {
		// 	console.log(err);
		// });
	}

	editDevice = (key, name) => {
		RestAPI.editDeviceType({
			params: {
				id: key,
				name: name
			}
		}).then(resp => {
			this.props.self.getDeviceaTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		})
	}
	deleteDevice = (key) => {
		RestAPI.deleteDeviceType({
			params: {
				id: key
			}
		}).then(resp => {
			this.props.self.getDeviceaTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		});
	}
	openModal = (type, e) => {
		if (type === 'Delete') {
			this.deleteFieldType();
			return;
		}
		let input = type ===  'Edit' ? this.state.fieldType.Name : '' ;
		this.setState({ type, input });
	}
	handleInput = (e) => {
		this.setState({ input: e.target.value });
	}
	handleCRUD = () => {
		if (this.state.type === 'Add' && (this.state.input !== '')) {
			this.addFieldType();
		}
		if (this.state.type === 'Edit' && (this.state.input !== '')) {
			this.editFieldTyoe();
		}
	}
	addFieldType = () => {
		RestAPI.addFieldType({
			params: {
				type: this.state.input
			}
		}).then(resp => {
			this.getFieldTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		});
	}
	editFieldTyoe = () => {
		RestAPI.editFieldTyoe({
			params: {
				id: this.state.fieldType.Id,
				type: this.state.input
			}
		}).then(resp => {
			this.getFieldTypes();
			console.log(resp);
		}).catch(err => {
			console.log(err);
		})
	}
	deleteFieldType = () => {
		RestAPI.deleteFieldType({
			params: {
				id: this.state.fieldType.Id
			}
		}).then(resp => {
			this.getFieldTypes();
			console.log(resp)
		}).catch(err => {
			console.log(err);
		})
	}

    render() {
		let parentThis = this.props.self;
		let deviceTypekey = this.state.key;
        return(
            <div>
				<Row style={{ backgroundColor: '#037832'}}>
					<Col span={3} style={{ padding: '1rem 0', 'color': 'white' }}>Select Equipment :</Col>
					<Col span={3} style={{ padding: '12px 0' }}>
						<Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a Device Type"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this, 'deviceType')}
                            value={this.state.selectedDeviceType}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.types.map(device => <Option key={device.Id} value={device.Key}>{device.Name + ' - ' + device.Description}</Option>)}
                        </Select>
					</Col>
					<Col span={4}>
						<Buttons self={this} type='Device'/>
					</Col>
					<Col span={3} style={{ padding: '1rem 0', 'color': 'white' }}>Select Field Type :</Col>
					<Col span={3} style={{ padding: '12px 0' }}>
						<Select
                            showSearch
                            style={{ width: '100%' }}
                            placeholder="Select a Field Type"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this, 'fieldType')}
                            value={this.state.fieldType.Name}
                            showSearch showArrow allowClear={false}
                        >
                            {this.state.fieldTypes.map(field => <Option key={field.Id} value={field.Name}>{field.Name}</Option>)}
                        </Select>
					</Col>
					<Col span={4} style={{ padding: '12px 0', display: 'flex', justifyContent: 'space-around' }}>
						<Button type='primary' onClick={this.openModal.bind(this, 'Add')}>+</Button>
						<Button type='primary' onClick={this.openModal.bind(this, 'Edit')}><EditOutlined /></Button>
						<Button type='danger' onClick={this.openModal.bind(this, 'Delete')}><DeleteOutlined /></Button>
					</Col>
				</Row>
				<div>
					{this.state.key && <MasterTable deviceTypekey={deviceTypekey} />}
				</div>
				<Modal
                    title={this.state.type + ' Field Type'}
                    visible={this.state.type}
                    onCancel={this.handleClose}
                    footer={null}
                >
                    <div>
                        <Input placeholder='Type Here' onChange={this.handleInput} value={this.state.input} />
                        <Button onClick={this.handleCRUD}>{this.state.type}</Button>
                    </div>
                </Modal>            

                {/* <Col span={6} className='col'>
                    <Card title="Type">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Device Type"
                            optionFilterProp="children"
                            onChange={this.onChange}
                            value={this.state.deviceType}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.types.map(device => <Option key={device.Id} value={device.Key}>{device.Name + ' - ' + device.Description}</Option>)}
                        </Select>	
                        <Buttons self={this} type='Device'/>
                    </Card>
                </Col>
                <Col span={18}>
                    {this.state.selectedDeviceType && <MasterTable self={this} data={this.state.deviceParamsData} />}
                </Col> */}
                {/* <Col span={4} className='col'>
                    <Card title="Description">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Plant Type"
                            optionFilterProp="children"
                            onChange={this.onChange.bind(this, 'plantType')}
                            value={this.state.plantType}
                            showSearch showArrow allowClear={false}
                        >
                            {this.state.plantTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
                        </Select>
                        <Buttons self={this} type='Plant Type'/>
                    </Card>
                </Col> */}
            </div>
        );
    }
}

export default DeviceType;