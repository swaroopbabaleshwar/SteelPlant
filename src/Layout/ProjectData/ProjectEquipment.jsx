import React, { useState, useEffect, Upload, Modal, message } from 'react';
import { UploadOutlined } from '@ant-design/icons';

import RestAPI from '../../api';

import { Table, Input, InputNumber, Popconfirm, Form, Select, Col, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SaveOutlined, EditOutlined, DeleteOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import UploadFile from './UploadFile';

import './ProjectData.less';

const { Option } = Select;

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
        {editing ? (
            <Form.Item
                name={dataIndex}
                style={{
                    margin: 0,
                }}
                rules={[
                    {
                        required: true,
                        message: `Please Input ${title}!`,
                    },
                ]}
                >
                {inputNode}
            </Form.Item>
        ) : (
            children
        )}
        </td>
    );
};

const EditableTable = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [sortedInfo, setSortedInfo] = useState({ columnKey: '', order: ''});
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [selectedRowKey, setSelectedRow] = useState('');

    const isEditing = record => record.Id === editingKey;
    const lineIds = [
        { lineId: 0, value: '' },
        { lineId: 1, value: 'A' },
        { lineId: 2, value: 'B' },
    ];
    useEffect( () => {
        setLoading(true);
        getProjectData();
        getDeviceTypes();
    }, []);

    const getProjectData = () => {
        RestAPI.getProjectData()
        .then(resp => {
            setLoading(false);
            setData(addProjectData(resp.data));
            form.resetFields();
        }).catch(err => {
            setLoading(false);
        });
    }

    const addProjectData = (data) => {
        let allData = [...data];
        let newData = {
            Description: "",
            DeviceType: '',
            // Id: 1021,
            LineId: '',
            Name: "",
            // Sequence: 1
            type: 'add'
        }
        
        allData.push(newData);

        return allData;
    }
    
    const getDeviceTypes = () => {
        RestAPI.getDeviceaTypes()
            .then(res => {
                // let types = [];
                if (res && res.data) {
                    setDeviceTypes(res.data)
                    // types = res.data.map(data => {
                    //     return data.Name + ' - ' + data.Description
                    // })
                }
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
    }    


  const edit = (record) => {
      if (editingKey === record.Id) {
          return;
      }
    form.setFieldsValue({ ...record });
    setEditingKey(record.Id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
        try {
        const row = await form.validateFields();
        const newData = [...data];
        const index = newData.findIndex(item => key === item.Id);
        if (index > -1) {
            const item = newData[index];
            editProjectData({...item, ...row});
            setEditingKey('');
        } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
        }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
  };

const editProjectData = (fieldValues = {}) => {
    setLoading(true);
    let data = {
        id: fieldValues.Id,
        name: fieldValues.Name,
        description: fieldValues.Description,
        lineId: fieldValues.LineId
    }
    RestAPI.editProjectData({
        params: {
            ...data
        }
    }).then(resp => {
        getProjectData();
        console.log(resp);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}

const add = async (record) => {
    delete record.type;
    const row = await form.validateFields();
    setLoading(true);
    let data = {
        name: row.Name,
        description: row.Description,
        deviceType_Id: record.DeviceType,
        lineId: record.LineId
    }
    RestAPI.addProjectData({
        params: {
            ...data
        }
    }).then(resp => {
        resp.data && getProjectData();
        console.log(resp);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}

const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

const handleReset = clearFilters => {
    clearFilters();
    setSearchText(searchText);
};

const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
}

let searchInput = null;
const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

const deleteRecord = (record) => {
    setLoading(true);
    RestAPI.deleteProjectData({
        params: {
            id: record.Id
        }
    }).then(resp => {
        getProjectData();
        console.log(resp);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });

    console.log(record);
    let filteredData = data.filter(d => d.Id !== record.Id);
    setData(filteredData);
    console.log(filteredData.length);
}

const onRowSelect = (record) => {
    setSelectedRow(record.Id);
    props.onRowSelect(record);
}
const isSelectedRow = record => record.Id === selectedRowKey;

const handleDeviceType = (val, e, h) => {
    let allData = [...data];
    let newData = val
    newData.DeviceType = h.key;
    let index = allData.findIndex(d => d.Id === val.Id);
    allData.splice(index, 1, newData);
    setData(allData);
}
const handleLineId = (val, e, h) => {
    let allData = [...data];
    let newData = val;
    newData.LineId = h.key;
    let index = allData.findIndex(d => d.LineId === val.LineId);
    allData.splice(index, 1, newData);
    setData(allData);
}

  const columns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        width: 100,
        editable: true,
        sorter: function(a, b) { return (a.Name.localeCompare(b.Name)) },
        sortOrder: sortedInfo.columnKey === 'Name' && sortedInfo.order,
        ...getColumnSearchProps('Name')
    },
    {
        title: 'DeviceType',
        // dataIndex: 'DeviceType',
        key: 'DeviceType',
        editable: false,
        width: 100,
        // sorter: function(a, b) { return (a.DeviceType.localeCompare(b.DeviceType)) },
        // sortOrder: sortedInfo.columnKey === 'DeviceType' && sortedInfo.order,
        // ...getColumnSearchProps('DeviceType'),
        render: (text, record) => {
            let data = deviceTypes.find(data => data.Id === +record.DeviceType);
            if (data) {
                return data.Name;
            }
            return <Select
                showSearch
                disabled={!(record.type === 'add')} size='small'
                style={{ width: '100%' }}
                placeholder="Select a Device Type"
                optionFilterProp="children"
                onChange={handleDeviceType.bind(this, record)}
                value={data ? data.Name: null}
                showSearch showArrow allowClear={false}
            >
                {deviceTypes.map(device => <Option key={device.Id} value={device.Name}>{device.Name}</Option>)}
            </Select>
        }
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        editable: true,
        width: 130,
        sorter: function(a, b) { return (a.Description.localeCompare(b.Description)) },
        sortOrder: sortedInfo.columnKey === 'Description' && sortedInfo.order,
        ...getColumnSearchProps('Description'),
        render: (text, record) => {
            return <div>{record.Description}</div>
        }
    },
    {
        title: 'LineId',
        dataIndex: 'LineId',
        editable: false,
        width: 100,
        render: (text, record) => {
            let data = lineIds.find(lineId => lineId.lineId === +record.LineId);
            return <Select
                showSearch
                size='small'
                style={{ width: '80px' }}
                placeholder="Select a Device Type"
                optionFilterProp="children"
                onChange={handleLineId.bind(this, record)}
                value={data ? data.Name: null}
                showSearch showArrow allowClear={false}
            >
                {lineIds.map(lineId => <Option key={lineId.lineId} value={lineId.value}>{lineId.value}</Option>)}
            </Select>
        }
    },
    {
      title: 'Action',
      width: 70,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
                {!(record.type === 'add') ? (<><a href="javascript:;" onClick={() => save(record.Id)} style={{ marginRight: 8, }} > <SaveOutlined style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}} /> </a>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}}>X</a>
                    </Popconfirm></>)
                    :<a style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}} onClick={() => add(record)}>+</a>}
            </span>
            ) : (
                <div style={{ width: '2rem', display: 'flex' }}>
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}> <EditOutlined style={{ fontSize: '18px', color: 'green', padding: '3px'}} /> </a>
                    <a onClick={() => deleteRecord(record)}> <DeleteOutlined style={{ fontSize: '18px', color: 'green', padding: '3px'}}/> </a>
                </div>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
        return col;
    }

    return {
        ...col,
        onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
    };
  });
  let rowClassName = (record) => {
    if (record.Id === selectedRowKey) {
        return "selectedRow";
    }
    return "";
};

const moveUp = () => {
    setLoading(true);
    RestAPI.moveUp({
        params: {
            id: selectedRowKey
        }
    }).then(res => {
        console.log(res);
        setLoading(false);
        getProjectData();
        setSelectedRow('');
    }).catch(err => {
        setLoading(false);
        console.log(err);
    })
}
const moveDown = () => {
    setLoading(true);
    RestAPI.moveDown({
        params: {
            id: selectedRowKey
        }
    }).then(res => {
        console.log(res);
        setLoading(false);
        getProjectData();
        setSelectedRow('');
    }).catch(err => {
        console.log(err);
        setLoading(false);
    })
}
const exportProjectData = () => {
    const url = "http://aic-arm.azurewebsites.net/ProjectDatas/Export";

    fetch(url, {
      headers: {
        'content-type': 'application/vnd.ms-excel;charset=UTF-8',
        'responseType': 'application/vnd.ms-excel'
      },
      method: 'GET'
    }).then(res => res.blob().then(blob => {
      const filename = decodeURI(res.headers.get('Content-Disposition')) 
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        const a = document.createElement('a')
        document.body.appendChild(a)
        a.href = window.URL.createObjectURL(blob)
        a.download = filename
        a.target = '_blank'
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
      }
    }))
}

return (
      <>
        <div className='ProjectEquipment'>
            {/* <div style={{ display: 'flex', padding: '10px' }}>
                <Col span={4} style={{ color: 'green', fontWeight: 'bold' }} >Device Parameter list</Col>
            </div> */}
            <div style={{ textAlign: 'left', paddingBottom: '5px' }}>
                <ArrowUpOutlined onClick={moveUp} style={{ fontSize: '18px', color: 'green', margin: '0 1rem', cursor: 'pointer' }} />
                <ArrowDownOutlined onClick={moveDown} style={{ fontSize: '18px', color: 'green', margin: '0 1rem', cursor: 'pointer' }} />
                <Button onClick={exportProjectData} type='primary' style={{ margin: '0 1rem' }}>Export</Button>
                {/* <Button type='primary' onClick={openModal}>Import</Button> */}
                <UploadFile />
                <div id='fileUpload'></div>
            </div>
            <Form form={form} component={false}>
                <Table
                    size='small'
                    onChange={handleChange}
                    id='table'
                    loading={loading}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    onRow={(record, index) => {
                        return {
                            onClick: event => {
                                // edit(record, true);
                                onRowSelect(record);
                            },
                        }
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName={rowClassName}
                    pagination={{ style: {paddingRight: 15} }}
                    pagination={{ pageSize: 50 }} scroll={{ y: props.contentHeight + 40, x: 'scroll' }}
                />
            </Form>
        </div>
      </>
    );
};
  
export default EditableTable;