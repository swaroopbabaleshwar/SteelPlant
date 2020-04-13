import React, { Component } from 'react';
import { Row, Col, Select, Card } from 'antd';

import styles from './DeviceType';

const { Option } = Select;

class GradeData extends Component{
    render() {
        let parentThis = this.props.self;

        return (
            <div className='row'>
                <Col span={10} className='col'>
                    <Card title="Group">
                        <Row>
                            <Col span={12}>
                                <Card title="Name">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Name"
                                        optionFilterProp="children"
                                        onChange={parentThis.onChange.bind(this, 'grpName')}
                                        value={parentThis.state.grpName}
                                        showSearch showArrow allowClear={false}
                                    >
                                        {parentThis.state.grpNames.map(type => <Option key={type} value={type}>{type}</Option>)}
                                    </Select>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="Type">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Name"
                                        optionFilterProp="children"
                                        onChange={parentThis.onChange.bind(this, 'grpType')}
                                        value={parentThis.state.grpType}
                                        showSearch showArrow allowClear={false}
                                    >
                                        {parentThis.state.grpTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
                                    </Select>
                                </Card>
                            </Col>
                            {/* <Col span={8}>
                                <Card title="Description">
                                        12
                                </Card>
                            </Col> */}
                            {/* <Buttons self={this} type='Consumer Classes' /> */}
                        </Row>
                    </Card>                            
                </Col>
                <Col span={14} className='col'>
                    <Card title="Grade">
                        <Row>
                            <Col span={6}>
                                <Card title="Name">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Name"
                                        optionFilterProp="children"
                                        onChange={parentThis.onChange.bind(this, 'gradeName')}
                                        value={parentThis.state.gradeName}
                                        showSearch showArrow allowClear={false}
                                    >
                                        {parentThis.state.gradeNames.map(type => <Option key={type} value={type}>{type}</Option>)}
                                    </Select>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Grade Gear">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Name"
                                        optionFilterProp="children"
                                        onChange={parentThis.onChange.bind(this, 'gradeGear')}
                                        value={parentThis.state.gradeGear}
                                        showSearch showArrow allowClear={false}
                                    >
                                        {parentThis.state.gradeGears.map(type => <Option key={type} value={type}>{type}</Option>)}
                                    </Select>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Grade Code">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Name"
                                        optionFilterProp="children"
                                        onChange={parentThis.onChange.bind(this, 'gradeCode')}
                                        value={parentThis.state.gradeCode}
                                        showSearch showArrow allowClear={false}
                                    >
                                        {parentThis.state.gradeCodes.map(type => <Option key={type} value={type}>{type}</Option>)}
                                    </Select>
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card title="Description">
                                    <Select
                                        showSearch
                                        style={{ width: '100%' }}
                                        placeholder="Name"
                                        optionFilterProp="children"
                                        onChange={parentThis.onChange.bind(this, 'desc')}
                                        value={parentThis.state.desc}
                                        showSearch showArrow allowClear={false}
                                    >
                                        {parentThis.state.descriptions.map(type => <Option key={type} value={type}>{type}</Option>)}
                                    </Select>
                                </Card>
                            </Col>
                            {/* <Buttons self={this} type='Consumer Classes' /> */}
                        </Row>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default GradeData;