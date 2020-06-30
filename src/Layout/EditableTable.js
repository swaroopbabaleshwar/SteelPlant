import React, { useState, useEffect } from 'react';
import RestAPI from '../api';

import { Table, Input, InputNumber, Popconfirm, Form, Select, Col, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

import './Layout.less';

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
  const [fieldTypes, setFieldTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [sortedInfo, setSortedInfo] = useState({ columnKey: '', order: ''});
  const [copyData, setCopyData] = useState([]);

  const isEditing = record => record.Id === editingKey;

  const datatypes = [
    // { Name: "", Id: 0 },
    { Name: "Boolean", Id: 1 },
    { Name: "Int16", Id: 2 },
    { Name: "Int32", Id: 3 },
    { Name: "Single", Id: 4 },
    { Name: "Double", Id: 5 },
    { Name: "String", Id: 6 },
    { Name: "StandMode", Id: 10 },
    { Name: "InterStandControlMode", Id: 11 },
    { Name: "Selection", Id: 12 },
    { Name: "CutMode", Id: 13 },
    { Name: "Profile", Id: 14 }
];

const searchDataType = {
    '1': "Boolean",
    '2': "Int16",
    '3': "Int32",
    '4': "Single",
    '5': "Double",
    '6': "String",
    '10': "StandMode",
    '11': "InterStandControlMode",
    '12': "Selection",
    '13': "CutMode",
    '24': "Profile",
}
  useEffect( () => {
    setLoading(true);
    getDeviceParameters(props.deviceTypekey);
  }, [props.deviceTypekey]);

  useEffect(() => {
    getFieldTypes();
  }, []);

  useEffect(() => {
      if (props.selectedFieldType.Id) {
        filterData(copyData);
      }
  }, [props.selectedFieldType.Id]);

  const filterData = (copyData) => {
      let filteredData = [...copyData];
    filteredData = filteredData.filter(d => +props.selectedFieldType.Id === (d.FieldTypeDefinition_Id));
    setData(filteredData);    
  }
const getFieldTypes = () => {
    RestAPI.getFieldTypes()
        .then(resp => {
            resp && resp.data && setFieldTypes(resp.data);
            console.log(resp);
        }).catch(err => {
            console.log(err);
        });
}

  const getDeviceParameters = (key, remove) => {
    RestAPI.getDeviceParameters({
        params: {
            id: key
        }
    }).then(resp => {
        if (resp && resp.data) {
            // if (remove) {
            //     data.shift();
            //     setData(data);
            // }
            setLoading(false);
            setData(addDeviceParameter(resp.data));
            setCopyData(resp.data);
            if (props.selectedFieldType.Id) {
                filterData(resp.data);
            }
        }
        console.log(resp);
    }).catch(err => {
        console.log(err);
        setLoading(false);
    });
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
            editDeviceParameter({...item, ...row});
            // newData.splice(index, 1, { ...item, ...row });
            // setData(newData);
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

  const editDeviceParameter = (fieldValues = {}) => {
    setLoading(true);
    RestAPI.editDeviceParameter({
        params: {
            ...fieldValues
        }
    }).then(resp => {
        getDeviceParameters(props.deviceTypekey);
        console.log(resp);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}


const handleFieldType = (val, e, h) => {
    let allData = [...data];
    let newData = val
    newData.FieldTypeDefinition_Id = h.key;
    let index = allData.findIndex(d => d.Id === val.Id);
    allData.splice(index, 1, newData);
    setData(allData);
}

const handleDataType = (val, e, h) => {
    let allData = [...data];
    let newData = val
    newData.DataType = h.key;
    let index = allData.findIndex(d => d.Id === val.Id);
    allData.splice(index, 1, newData);
    setData(allData);
}

const addDeviceParameter = (data) => {
    const allData = [...data];
    const newData = {
        // "ID": allData.length,
        'DataType': '',
        'Description': "",
        'DeviceType_Id': '',
        'FieldTypeDefinition_Id': '',
        'Length': '',
        'Name': '',
        'Unit': "--",
        'type': 'add'
    };
    allData.push(newData);
    form.resetFields();
    return allData;
    // setData(allData);
    // edit(newData);
}
const add = async (record) => {
    delete record.type;
    const row = await form.validateFields();
    setLoading(true);
    RestAPI.addDeviceparameters({
        params: {
            ...record, ...row, DeviceType_Id: props.deviceTypekey
        }
    }).then(resp => {
        resp.data && getDeviceParameters(props.deviceTypekey, true);
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
    onFilter: (value, record) => {
        if (dataIndex === 'DataType') {
            if (!record[dataIndex]) {
                return false;
            }
            return searchDataType[record[dataIndex]].toString()
                .toLowerCase()
                .includes(value.toLowerCase())
            // let dataTypeId = searchDataType[value];
            // if (dataTypeId) {
            //     return record.DataType === +dataTypeId ? record: null;
            // }
            // return false;
        }
        return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase())
    },
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
    RestAPI.deleteDeviceParameter({
        params: {
            id: record.Id
        }
    }).then(resp => {
        getDeviceParameters(props.deviceTypekey);
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

  const columns = [
    {
        title: 'Name',
        dataIndex: 'Name',
        key: 'Name',
        editable: true,
        sorter: function(a, b) { return (a.Name.localeCompare(b.Name)) },
        sortOrder: sortedInfo.columnKey === 'Name' && sortedInfo.order,
        ...getColumnSearchProps('Name')
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        editable: true,
        sorter: function(a, b) { return (a.Description.localeCompare(b.Description)) },
        sortOrder: sortedInfo.columnKey === 'Description' && sortedInfo.order,
        ...getColumnSearchProps('Description')
    },
    {
        title: 'Data Type',
        editable: false,
        width: '120px',
        ...getColumnSearchProps('DataType'),
        render: (text, record) => {
            let data = datatypes.find(data => data.Id === +record.DataType);
            return (
                <Select
                    showSearch
                    size='small'
                    style={{ width: '120px' }}
                    placeholder="Select a Data Type"
                    optionFilterProp="children"
                    onChange={handleDataType.bind(this, record)}
                    value={data ? data.Name : null}
                    showSearch showArrow allowClear={false}
                >
                    {datatypes.map(data => <Option key={data.Id} value={data.Name}>{data.Name}</Option>)}
                </Select>
            );
        },
    },
    {
        title: 'Unit',
        dataIndex: 'Unit',
        editable: true,
    },
    {
        title: 'Field Type',
        width: '120px',
        render: (text, record) => {
            let data = fieldTypes.find(data => data.Id === +record.FieldTypeDefinition_Id);
            return (
                <Select
                    showSearch
                    size='small'
                    style={{ width: '120px' }}
                    placeholder="Select a Field Type"
                    optionFilterProp="children"
                    onChange={handleFieldType.bind(this, record)}
                    value={data ? data.Name : null}
                    showSearch showArrow allowClear={false}
                >
                    {fieldTypes.map(field => <Option key={field.Id} value={field.Name}>{field.Name}</Option>)}
                </Select>
            );
        },
        editable: false,    
    },
    {
      title: 'operation',
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
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}> <EditOutlined style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}} /> </a>
                    <a onClick={() => deleteRecord(record)}> <DeleteOutlined style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}}/> </a>
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
  return (
      <div className='EditableTable'>
        <div style={{ display: 'flex', padding: '10px' }}>
            <Col span={4} style={{ color: 'green', fontWeight: 'bold' }} >Device Parameter list</Col>
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
                        onClick: event => { edit(record, true) },
                    }
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{ pageSize: 50 }} scroll={{ y: props.contentHeight }}
            />
        </Form>
    </div>
    );
};

export default EditableTable;