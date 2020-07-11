// import React, { Component } from 'react';
// import styles from './tabs.css';
// import MasterTable from './MasterTable';

// import { Card, Row, Col, Select, Button, Modal, Input, Tabs } from 'antd';
// const { Option } = Select;
// const { TabPane } = Tabs;


// class MasterData extends Component {
//     constructor() {
//         super();
//         this.state = {
//             devices: [ 'STAND', 'ROLLER TABLE', 'PINCHROLL' ],
//             deviceData: '',
//             key: '1'
//         }
//     }

//     onChange = (type, value, e) => {
//         this.setState({ [type]: value });
//         console.log(value)
//     }
//     changeTab = (key) => {
//         this.setState({ key });
//     }
//     render() {
//         return(
//             <>
//                 <div className='tab'>
//                     <div className='dropdown'>
//                         <Tabs defaultActiveKey="1" onChange={this.changeTab}>
//                             <TabPane tab="PLANT DATA" key="1">
//                                 {/* <div className='row'>
//                                     <Col span={10} className='col'>
//                                         <Card title="Plant Type">
//                                             <Select
//                                                 showSearch
//                                                 style={{ width: '80%' }}
//                                                 placeholder="Select a Plant Type"
//                                                 optionFilterProp="children"
//                                                 onChange={this.onChange.bind(this, 'plantType')}
//                                                 value={this.state.plantType}
//                                                 showSearch showArrow allowClear={false}
//                                             >
//                                                 {this.state.plantTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
//                                             </Select>
//                                             <Buttons self={this} type='Plant Type'/>
//                                         </Card>
//                                     </Col>
//                                 </div> */}
//                             </TabPane>
//                             <TabPane tab="DEVICE DATA" key="2">
//                                 {/* <div className='row'>
//                                     <Col span={10} className='col'>
//                                         <Card title="Device">
//                                             <Select
//                                                 showSearch
//                                                 style={{ width: '80%' }}
//                                                 placeholder="Select Device Data"
//                                                 optionFilterProp="children"
//                                                 onChange={this.onChange.bind(this, 'deviceData')}
//                                                 value={this.state.deviceData}
//                                                 showSearch showArrow allowClear={false}
//                                             >
//                                                 {this.state.devices.map(type => <Option key={type} value={type}>{type}</Option>)}
//                                             </Select>
//                                             <Buttons self={this} type='Device' />
//                                         </Card>
//                                     </Col>
//                                 </div> */}
//                             </TabPane>
//                             <TabPane tab="GRADE DATA" key="3">
//                                 <div className='row'>

//                                 </div>
//                             </TabPane>
//                             <TabPane tab="STOPPAGE CLASSES" key="4">
//                                 {/* <div className='row'>
//                                     <Col span={10} className='col'>
//                                         <Card title="Stoppage Classes">
//                                             <Select
//                                                 showSearch
//                                                 style={{ width: '80%' }}
//                                                 placeholder="Select a Stoppage"
//                                                 optionFilterProp="children"
//                                                 onChange={this.onChange.bind(this, 'stoppage')}
//                                                 value={this.state.stoppage}
//                                                 showSearch showArrow allowClear={false}
//                                             >
//                                                 {this.state.stoppageClasses.map(type => <Option key={type} value={type}>{type}</Option>)}
//                                             </Select>
//                                             <Buttons self={this} type='Stoppage Classes' />
//                                         </Card>
//                                     </Col>
//                                 </div> */}
//                             </TabPane>
//                             <TabPane tab="CONSUMPTION CLASSES" key="5">
//                                 {/* <div className='row'>
//                                     <Col span={10} className='col'>
//                                         <Card title="Consumption Classes">
//                                             <Select
//                                                 showSearch
//                                                 style={{ width: '80%' }}
//                                                 placeholder="Select a Consumer"
//                                                 optionFilterProp="children"
//                                                 onChange={this.onChange.bind(this, 'consumer')}
//                                                 value={this.state.consumer}
//                                                 showSearch showArrow allowClear={false}
//                                             >
//                                                 {this.state.consumptionClasses.map(type => <Option key={type} value={type}>{type}</Option>)}
//                                             </Select>
//                                             <Buttons self={this} type='Consumer Classes' />
//                                         </Card>
//                                     </Col>
//                                 </div> */}
//                             </TabPane>
//                         </Tabs>
//                     </div>
//                     <div className='table'>
//                         <MasterTable />
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }


// export default MasterData;