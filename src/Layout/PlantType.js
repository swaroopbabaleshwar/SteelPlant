import React, { Component } from 'react';

import { Buttons } from './Main';
import MasterData from '../components/Tabs/MasterData';
import styles from './Layout.less';

import { Row, Col, Card, Select } from 'antd';

const { Option } = Select;


class PlantType extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    // changeTab = (key) => {
    //     this.setState({ key });
    // }

    render() {
        let parentThis = this.props.self;

        return (
            <div className='row'>
                <Col span={10} className='col'>
                    <Card title="Plant Type">
                        <Select
                            showSearch
                            style={{ width: '80%' }}
                            placeholder="Select a Plant Type"
                            optionFilterProp="children"
                            onChange={parentThis.onChange.bind(this, 'plantType')}
                            value={parentThis.state.plantType}
                            showSearch showArrow allowClear={false}
                        >
                            {parentThis.state.plantTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
                        </Select>
                        <Buttons self={parentThis} type='Plant Type'/>
                    </Card>
                </Col>
            </div>
        );
    }
}

export default PlantType;