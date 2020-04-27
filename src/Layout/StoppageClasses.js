import React, { Component } from 'react';
import { Buttons } from './Main';
import styles from './Layout.less';

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
            <div className='row' >
                <Col span={10} className='col'>
                    <Card title="Stoppage Classes">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Stoppage"
                            optionFilterProp="children"
                            onChange={parentThis.onChange.bind(this, 'stoppage')}
                            value={parentThis.state.stoppage}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.stoppageClasses.map(type => <Option key={type} value={type}>{type}</Option>)}
                        </Select>
                        <Buttons self={parentThis} type='Stoppage Classes' />
                    </Card>
                </Col>
        </div>
        );
    }
}

export default StoppageClasses;