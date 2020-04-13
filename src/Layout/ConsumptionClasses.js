import React, { Component } from 'react';
import { Buttons } from './Main';
import styles from './Layout.css';

import { Row, Col, Card, Select } from 'antd';

const { Option } = Select;

class StoppageClasses extends Component {
    constructor() {
        super();
        this.state = {
            
        }
    }
    render() {
        let parentThis = this.props.self;

        return (
            <div className='row'>
                <Col span={10} className='col'>
                    <Card title="Consumption Classes">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Consumer"
                            optionFilterProp="children"
                            onChange={parentThis.onChange.bind(this, 'consumer')}
                            value={parentThis.state.consumer}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.consumptionClasses.map(type => <Option key={type} value={type}>{type}</Option>)}
                        </Select>
                        <Buttons self={parentThis} type='Consumer Classes' />
                    </Card>
                </Col>
            </div>
        );
    }
}

export default StoppageClasses;