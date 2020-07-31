import React, { Component } from 'react';
import RestAPI from '../../../api';
import { Select, Button, Modal, Input } from 'antd';

import { EditFilled, DeleteFilled } from '@ant-design/icons';

import '../settings.less';

class MainReason extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reasons: [],
            selectedMainReason: {},
            type: null,
            input: ''
        }
    }

    componentDidMount() {
        this.getDelayReasons();
    }

    getDelayReasons = () => {
        RestAPI.getDelayReasons()
            .then(resp => {
                if (resp.status === 200) {
                    this.setState({ reasons: resp.data });
                }
            }).catch(err => {
                console.log(err);
            });
    }

    handleMainReason = (value, e) => {
        this.setState({ selectedMainReason: { Id: e.key, Name: e.value }});
    }

    openModal = (type) => {
        this.setState({ type });
    }
    closeModal = () => {
        this.setState({ type: null });
    }

    handleInput = (e) => {
        this.setState({ input: e.target.value });
    }

    handleCRUD = (type) => {
        if (type === 'Add') {
            this.addReason();
        }
    }

    addReason = () => {
        RestAPI.addDelayReason({
            params: {
                
            }
        })
    }

    render () {
        return(
            <div className='MainReason'>
                <div style={{ display: 'flex' }}>
                    <Select
                        showSearch
                        style={{ width: '50%' }}
                        placeholder="Main Reason"
                        optionFilterProp="children"
                        onChange={this.handleMainReason}
                        value={this.state.selectedMainReason.Name}
                        showSearch showArrow
                    >
                        {this.state.reasons.map(reason => <Select.Option key={reason.Id} value={reason.Name}>{reason.Name}</Select.Option>)}
                    </Select>
                    <div style={{ padding: '0 12px', display: 'flex', justifyContent: 'space-around' }}>
                        <Button onClick={this.openModal.bind(this, 'Add')} type='primary'>+</Button>
                        <Button onClick={this.openModal.bind(this, 'Edit')} type='primary'><EditFilled /></Button>
                        <Button onClick={this.openModal.bind(this, 'Delete')} type='danger'><DeleteFilled /></Button>
                    </div>
                </div>
                <Modal
                    title={this.state.type}
                    visible={this.state.type}
                    onCancel={this.closeModal}
                    footer={null}
                >
                    <div>
                        {this.state.type === 'Edit' && (Object.keys(this.state.selectedMainReason).length) === 0 ?
                            'Please select a reason to edit' :
                                <>
                                    <Input placeholder='Type Here' onChange={this.handleInput} value={this.state.input} />
                                    <Button onClick={this.handleCRUD.bind(this, this.state.type)}>{this.state.type}</Button>
                                </>
                            }
                    </div>
                </Modal>
            </div>
        );
    }
}

export default MainReason;