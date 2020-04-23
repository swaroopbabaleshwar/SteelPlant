import React, { useState, PureComponent, useEffect } from 'react';
import RestAPI from '../../api';

import { Table, Input, InputNumber, Popconfirm, Form, Button, Modal, Row, Col, Checkbox, Select } from 'antd';
import { SmallDashOutlined } from '@ant-design/icons';
const { Option } = Select;

class MasterTable extends PureComponent {
    constructor(props) {
        super();
        this.state = {
            data: [],
            fieldTypes: [],
        }
    }

    componentDidMount() {
		this.getDeviceParameters(this.props.deviceTypekey);
        this.getFieldTypes();
    }

    getDeviceParameters = (key) => {
		RestAPI.getDeviceParameters({
			params: {
				id: key
			}
		}).then(resp => {
			if (resp && resp.data) {
				let data = resp.data.map(d => {
					d['fieldType'] = '';
					return d;
				})
				this.setState({ data });
			}
			console.log(resp);
		}).catch(err => {
			console.log(err);
		});
	}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.deviceTypekey !== this.props.deviceTypekey) {
            this.getDeviceParameters(this.props.deviceTypekey);
        }
    }


    handleFieldType = (val, e) => {
        let allData = [...this.state.data];
        let newData = allData.find(d => d.Id === e.Id);
        newData.fieldType = val;
        let index = allData.findIndex(d => d.Id === e.Id);
        allData.splice(index, 1, newData);
        this.setState({ data: allData });
    }

    getFieldTypes = () => {
		RestAPI.getFieldTypes()
            .then(resp => {
                resp && resp.data && this.setState({ fieldTypes: resp.data });
                console.log(resp);
            }).catch(err => {
                console.log(err);
            });
	}

    editable = (record) => {
        
    }

    render() {
        let data = this.props.data;
        let columns = [
            {
                title: 'Name',
                dataIndex: 'Name',
                editable: true,
            },
            {
                title: 'Description',
                dataIndex: 'Description',
                editable: true,    
            },
            {
                title: 'Data Type',
                dataIndex: 'DataType',
                editable: true,    
            },
            {
                title: 'Unit',
                dataIndex: 'Unit',
                editable: true,    
            },
            {
                title: 'Field Type',
                render: (text, record) => {
                    return (
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Field Type"
                            optionFilterProp="children"
                            onChange={(e) => this.handleFieldType(e, record)}
                            value={record.fieldType}
                            showSearch showArrow allowClear={false}
                        >
                            {this.state.fieldTypes.map(field => <Option key={field.Id} value={field.Name}>{field.Name}</Option>)}
                        </Select>
                    );
                },
                editable: false,    
            },

        ];
        
        return (
            <Table dataSource={this.state.data} 
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                onRow={(record, index) => {
                    return {
                        onClick: event => { this.editable(record) },
                    }
                }}
                columns={columns}  />
        );
    }
}

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{ margin: 0 }}
                    // rules={[ {required: true, message: `Please Input ${title}!`} ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
            children
            )}
        </td>
    );
};

export default MasterTable;

// // const originData = [];
// var originData = [
//     {
//         "Description of Parameter": "System - Recipe Download correctly finished",
//         "System Tag Name": "@SYS_Recipe_Download_Ok",
//         "Gr1": "System",
//         "Gr2": "System",
//         "Item": "System",
//         "Type": "bit",
//         "Unit": "--",
//         "Scale": "0",
//         "Base Limit": "0",
//         "High Limit": "0",
//         "Default Value": "0",
//         "OPC PLC": "L10_RACS.RACS_CPU.",
//         "OPC Item": "RACSProductRecipe.bDownloadCorrect",
//         "OPCServer": "OPC.SimaticNET",
//         "Node": "localhost",
//         "Comments": "System - Recipe Download correctly finished"
//     },

// ];
// originData = originData.map((d, index) => {
//     d['Id'] = index;
//     return d;
// })
  
// const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps}) => {
//     const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//     return (
//         <td {...restProps}>
//             {editing ? (
//                 <Form.Item name={dataIndex} style={{ margin: 0 }}
//                     rules={[
//                     {
//                         required: true,
//                         message: `Please Input ${title}!`,
//                     },
//                     ]}
//                 >
//                     {inputNode}
//                 </Form.Item>
//             ) : (
//             children
//             )}
//         </td>
//     );
// };


  
// const EditableTable = (props) => {
//     const [form] = Form.useForm();
//     const [data, setData] = useState(props.data);
//     const [editingKey, setEditingKey] = useState('');
//     const [selectedParams, setSelectionParams] = useState([]);
//     const [selectedRecords, setSelectedRecords] = useState([]);
//     const [fieldTypes, setFieldTypes] = useState([]);

//     useEffect(() => {
//         setData(props.data);
//     }, [props.data]);

//     useEffect(() => {
//         getFieldTypes();
//     }, []);

//     const getFieldTypes = () => {
// 		RestAPI.getFieldTypes()
// 		.then(resp => {
// 			resp && resp.data && setFieldTypes(resp.data);
// 			console.log(resp);
// 		}).catch(err => {
// 			console.log(err);
// 		});
// 	}

//     const isEditing = record => record.Id === editingKey;

//     const edit = record => {
//         form.setFieldsValue({ ...record });
//         setEditingKey(record.Id);
//     };

//     const cancel = () => {
//         setEditingKey('');
//     };

//     const save = async key => {
//         let parentThis = props.self;
//         try {
//             const row = await form.validateFields();
//             const newData = [...data];
//             const index = newData.findIndex(item => key === item.Id);

//             if (index > -1) {
//                 const item = newData[index];
//                 parentThis.editDeviceParameter(item, row);
//                 newData.splice(index, 1, { ...item, ...row });
//                 setData(newData);
//                 setEditingKey('');
//             } else {
//                 newData.push(row);
//                 setData(newData);
//                 setEditingKey('');
//             }
//         } catch (errInfo) {
//             console.log('Validate Failed:', errInfo);
//         }
//     };

//     const deleteRecord = (record) => {
//         console.log(record);
//         let filteredData = data.filter(d => d.Id !== record.Id);
//         setData(filteredData);
//         console.log(filteredData.length);
//     }

//     const onCheckboxToggle = (record) => {
//         let key = record.Id;
//         let pos = selectedParams.indexOf(key);
//         let selectedParams1 = [...selectedParams];
//         let selRecords = [...selectedRecords];

//         if (pos === -1) {
//             selectedParams1.push(key);
//             selRecords.push(record);
//         } else {
//             selectedParams1.splice(pos, 1);
//             selRecords.splice(pos, 1);
//         }
//         setSelectionParams(selectedParams1);
//         setSelectedRecords(selRecords);
//     }

//     // const addDeviceParams = (item) => {
//     //     props.self.addDeviceparameterList(item);
//     // }
//     const handleFieldType = (val, e) => {
//         let allData = [...data];
//         let newData = allData.find(d => d.Id === e.Id);
//         newData.fieldType = val;
//         let index = allData.findIndex(d => d.Id === e.Id);
//         allData.splice(index, 1, newData);
//         setData(allData);
//         console.log(val, e);
//     }
    
//     const columns = [
//         {
//             dataIndex: "check",
//             render: (text, record) => {
//                 return <Checkbox name={record.Name} checked={selectedParams.indexOf(record.Id) > -1 ? 1 : 0} onChange={onCheckboxToggle.bind(this, record)} />;
//             }
//         },
//         {
//             title: 'Name',
//             dataIndex: 'Name',
//             editable: true,
//         },
//         {
//             title: 'Description',
//             dataIndex: 'Description',
//             width: '10%',
//             editable: true,
//         },
//         {
//             title: <span>Data Type</span>,
//             dataIndex: 'DataType',
//             editable: true,
//         },
//         {
//             title: 'Unit',
//             dataIndex: 'Unit',
//             editable: true,
//         },
//         {
//             title: 'Field Type',
//             render: (text, record) => (
//                 <Select
//                     showSearch
//                     style={{ width: '80%' }}
//                     placeholder="Select a Field Type"
//                     optionFilterProp="children"
//                     onChange={(e) => handleFieldType(e, record)}
//                     value={record.fieldType}
//                     showSearch showArrow allowClear={false}
//                 >
//                     {fieldTypes.map(field => <Option key={field.Id} value={field.Name}>{field.Name}</Option>)}
//                 </Select>
//             ),
//             editable: false,
//         },
//         // {
//         //     title: 'Type',
//         //     dataIndex: 'Type',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'Unit',
//         //     dataIndex: 'Unit',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'Scale',
//         //     dataIndex: 'Scale',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'Base Limit',
//         //     dataIndex: 'Base Limit',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'High Limit',
//         //     dataIndex: 'High Limit',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'Default Value',
//         //     dataIndex: 'Default Value',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'OPC PLC',
//         //     dataIndex: 'OPC PLC',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'OPC Item',
//         //     dataIndex: 'OPC Item',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'Node',
//         //     dataIndex: 'Node',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         // {
//         //     title: 'Comments',
//         //     dataIndex: 'Comments',
//         //     width: '10%',
//         //     editable: true,
//         // },
//         {
//             title: 'operation',
//             dataIndex: 'operation',
//             fixed: "right",
//             render: (_, record) => {
//                 const editable = isEditing(record);
//                 return editable ? (
//                         <span>
//                             <a href="javascript:;" onClick={() => save(record.Id)} style={{ marginRight: 8 }} > Save </a>
//                             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//                             <a>Cancel</a>
//                             </Popconfirm>
//                         </span>
//                     ) : (
//                         <>
//                             <a disabled={editingKey !== ''} onClick={() => edit(record)}> Edit </a>
//                             <a onClick={() => deleteRecord(record)}> Delete </a>
//                         </>
//                 );
//             },
//         },
//     ];
//     const mergedColumns = columns.map(col => {
//         if (!col.editable) {
//             return col;
//         }

//         return {
//         ...col,
//         onCell: record => ({
//             record,
//             inputType: col.dataIndex === 'age' ? 'number' : 'text',
//             dataIndex: col.dataIndex,
//             title: col.title,
//             editing: isEditing(record),
//         }),
//         };
//     });

//     const addDeviceParameter = () => {
//         const allData = [...data];
//         const newData = {
//             "ID": allData.length,
//             'DataType': '',
//             'Description': "",
//             'DeviceType_Id': '',
//             'FieldTypeDefinition_Id': '',
//             'Length': '',
//             'Name': '',
//             'Unit': "--"
//         };
//         allData.unshift(newData);
//         setData(allData);
//         edit(newData);
//     }

//     return (
//         <>
//             <div style={{ display: 'flex', padding: '10px' }}>
//                 <Col span={4} style={{ color: 'green', fontWeight: 'bold', paddingTop: '5px' }} >Device Parameter list</Col>
//                 <Col span={4}>
//                     <Button type='primary' onClick={() => addDeviceParameter()}>Add</Button>
//                 </Col>
//             </div>
//             <Form form={form} component={false}>
//                 <Table scroll={{ x: true }} size='small'
//                     components={{
//                         body: {
//                             cell: EditableCell,
//                         },
//                     }}
//                     size='small'
//                     onRow={(record, index) => {
//                         return {
//                             onClick: event => { edit(record) },
//                         }
//                     }}
//                     bordered dataSource={data} columns={mergedColumns} rowClassName="editable-row"
//                     pagination={false}
//                 />
//             </Form>
//             {/* <Modal
//                 centered={true}
//                 title='Device Parameter'
//                 visible={open}
//                 onCancel={() => setOpen(false)}
//                 footer={null}
//             >
//                 <DeviceParameter data={data} addDeviceParams={addDeviceParams} setData={setData} closeModal={() => setOpen(false)} />
//             </Modal> */}
//         </>
//     );
// };

// class DeviceParameter extends Component {
//     constructor() {
//         super();
//         this.state = {
//             DataType: '',
//             Description: "",
//             DeviceType_Id: '',
//             FieldTypeDefinition_Id: '',
//             Id: '',
//             Length: '',
//             Name: '',
//             Unit: "--",
//             'DescriptionofParameter': '',
//             'SystemTagName': '',
//             'Gr1': '',
//             'Gr2': '',
//             // 'Item': '',
//             'Type': '',
//             'Unit': '',
//             // 'Scale': '',
//             // 'Base Limit': '',
//             // 'High Limit': '',
//             // 'Default Value': '',
//             // 'OPC PLC': '',
//             // 'OPC Item': '',
//             // 'OPCServer': '',
//             // 'Node': '',
//             'Comments': ''
//         }
//     }

//     updateDesc = (e) => {
//         this.setState({ 'Description': e.target.value });
//     }
//     updateTagname = (e) => {
//         this.setState({'SystemTagName': e.target.value });
//     }
//     updateGr1 = (e) => {
//         this.setState({ 'Gr1': e.target.value });
//     }
//     updateGr2 = (e) => {
//         this.setState({ 'Gr2': e.target.value });
//     }
//     // updateItem = (e) => {
//     //     this.setState({ 'Item': e.target.value });
//     // }
//     updateType = (e) => {
//         this.setState({ 'Type': e.target.value });
//     }
//     updateUnit = (e) => {
//         this.setState({ Unit: e.target.value });
//     }
//     updateScale = (e) => {
//         this.setState({ Scale: e.target.value });
//     }
//     // updateBaseLimit = (e) => {
//     //     this.setState({ 'Base Limit': e.target.value });
//     // }
//     // updateHignLimit = (e) => {
//     //     this.setState({ 'High Limit': e.target.value });
//     // }
//     // updateDefaultValue = (e) => {
//     //     this.setState({ 'Default Value': e.target.value });
//     // }
//     // updateOpcPlc = (e) => {
//     //     this.setState({ 'OPC PLC': e.target.value });
//     // }
//     // updateOpcItem = (e) => {
//     //     this.setState({ 'OPC Item': e.target.value });
//     // }
//     // updateOpcServer = (e) => {
//     //     this.setState({ 'OPCServer': e.target.value });
//     // }
//     // updateNode = (e) => {
//     //     this.setState({ Node: e.target.value });
//     // }
//     updateComments = (e) => {
//         this.setState({ Comments: e.target.value });
//     }

//     addDeviceParam = () => {
//         // let parentThis = this.props.self;
//         // let parentThis = this.props.self;
//         let newItem = {...this.state};
//         this.props.addDeviceParams(newItem);

//         // let data = [...this.props.data];
//         // newItem['key'] = data.length;
//         // data.push(newItem);
//         this.props.closeModal();
//         // this.props.setData(data);
//     }

//     render(){
       
//         return(
//             <>
//                 <div className="UpdateUserDetails">
//                     <Row>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Description of Parameter</Col>
//                                 <Col span={14}><Input placeholder="Description of Parameter" onChange={this.updateDesc} value={this.state['Description of Parameter']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>System Tag Name</Col>
//                                 <Col span={14}><Input placeholder="System Tag Name" onChange={this.updateTagname} value={this.state['System Tag Name']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Gr1</Col>
//                                 <Col span={14}><Input placeholder="Gr1" onChange={this.updateGr1} value={this.state['Gr1']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Gr2</Col>
//                                 <Col span={14}><Input placeholder="Gr2" maxlength="10" onChange={this.updateGr2} value={this.state.Gr2} /></Col>
//                             </Row>
//                         </Col>
//                         {/* <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Item</Col>
//                                 <Col span={14}><Input placeholder="Update Item" onChange={this.updateItem} value={this.state.Item} /></Col>
//                             </Row>
//                         </Col> */}
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Type</Col>
//                                 <Col span={14}><Input placeholder="Type" onChange={this.updateType} value={this.state.Type} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Unit</Col>
//                                 <Col span={14}><Input placeholder="Update Unit" onChange={this.updateUnit} value={this.state.Unit} /></Col>
//                             </Row>
//                         </Col>
//                         {/* <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Scale</Col>
//                                 <Col span={14}><Input placeholder="Scale" onChange={this.updateScale} value={this.state.Scale} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Base Limit</Col>
//                                 <Col span={14}><Input placeholder="Base Limit" onChange={this.updateBaseLimit} value={this.state['Base Limit']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Hign Limit</Col>
//                                 <Col span={14}><Input placeholder="Hign Limit" onChange={this.updateHignLimit} value={this.state['High Limit']} /></Col>
//                             </Row>
//                         </Col> */}
//                         {/* <Col span={24} className="?assignCol">
//                             <Row>
//                                 <Col span={10}>Default value</Col>
//                                 <Col span={14}><Input placeholder="Default value" onChange={this.updateDefaultValue} value={this.state['Default Value']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>OPC PLC</Col>
//                                 <Col span={14}><Input placeholder="OPC PLC" onChange={this.updateOpcPlc} value={this.state['OPC PLC']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>OPC Item</Col>
//                                 <Col span={14}><Input placeholder="OPC Item" onChange={this.updateOpcItem} value={this.state['OPC Item']} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>OPC Server</Col>
//                                 <Col span={14}><Input placeholder="OPC Server" onChange={this.updateOpcServer} value={this.state.OPCServer} /></Col>
//                             </Row>
//                         </Col>
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Node</Col>
//                                 <Col span={14}><Input placeholder="Node" onChange={this.updateNode} value={this.state.Node} /></Col>
//                             </Row>
//                         </Col> */}
//                         <Col span={24} className="assignCol">
//                             <Row>
//                                 <Col span={10}>Comments</Col>
//                                 <Col span={14}><Input placeholder="Comments" onChange={this.updateComments} value={this.state.Comments} /></Col>
//                             </Row>
//                         </Col>
//                     </Row>
//                 </div>
//                 <div style={{'display': 'flex', 'justifyContent': 'flex-end', marginTop: '5px'}}>
//                     <Button type='danger' onClick={this.addDeviceParam} >Add</Button>
//                 </div>
//             </>
//         );
//     }
// }
// export default EditableTable;