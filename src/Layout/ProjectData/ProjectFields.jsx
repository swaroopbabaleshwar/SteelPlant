import React, { useState, useEffect } from 'react';
import RestAPI from '../../api';

import { Table, Input, InputNumber, Popconfirm, Form, Select, Col, Button, Checkbox } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, SaveOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

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
    const [fieldTypes, setFieldTypes] = useState([]);

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
    
    useEffect( () => {
        setLoading(true);
        getProjectFields();
        getFieldTypes();
    }, [props.selectedRecordId]);

    const getProjectFields = () => {
        RestAPI.getProjectFields({
            params: {
                id: props.selectedRecordId
            }
        })
        .then(resp => {
            setLoading(false);
            setData(resp.data);
        }).catch(err => {
            setLoading(false);
        });
    
    // RestAPI.getDeviceParameters({
    //     params: {
    //         id: key
    //     }
    // }).then(resp => {
    //     if (resp && resp.data) {
    //         // if (remove) {
    //         //     data.shift();
    //         //     setData(data);
    //         // }
    //         setLoading(false);
    //         setData(addDeviceParameter(resp.data));
    //     }
    //     console.log(resp);
    // }).catch(err => {
    //     console.log(err);
    //     setLoading(false);
    // });
}

const getFieldTypes = () => {
    RestAPI.getFieldTypes()
        .then(res => {
            // let types = [];
            if (res && res.data) {
                setFieldTypes(res.data)
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
        excludeFlag: fieldValues.ExcludeFlag,
        defaultValue: fieldValues.Default,
        minValue: fieldValues.Min,
        maxValue: fieldValues.Max,
        offset: fieldValues.Offset,
        scale: fieldValues.Scale,
        oPCTopic: fieldValues.OPCTopic,
        oPCTagPath: fieldValues.OPCTagPath,
        oPCReadTagPath: fieldValues.OPCReadTagPath
    }
    RestAPI.editProjectFields({
        params: {
            ...data
        }
    }).then(resp => {
        getProjectFields();
        console.log(resp);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
}

const handleDataType = (val, e, h) => {
    let allData = [...data];
    let newData = val
    newData.DataType = h.key;
    let index = allData.findIndex(d => d.Id === val.Id);
    allData.splice(index, 1, newData);
    setData(allData);
}
const handleFieldType = (val, e, h) => {
    let allData = [...data];
    let newData = val
    newData.Type = h.key;
    let index = allData.findIndex(d => d.Type === val.Type);
    allData.splice(index, 1, newData);
    setData(allData);
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

const handleExclude = (e, val, h) => {
    let d = data.find(_ => _.Id === val.Id);
    d.ExcludeFlag = e.target.checked;
    let index = data.findIndex(d => d.Id === val.Id);
    data.splice(index, 1, d);
    setData(data);
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

// const deleteRecord = (record) => {
//     setLoading(true);
//     RestAPI.deleteProjectData({
//         params: {
//             id: record.Id
//         }
//     }).then(resp => {
//         getProjectFields();
//         console.log(resp);
//     }).catch(err => {
//         setLoading(false);
//         console.log(err);
//     });

//     console.log(record);
//     let filteredData = data.filter(d => d.Id !== record.Id);
//     setData(filteredData);
//     console.log(filteredData.length);
// }

  const columns = [
    {
        title: 'Field Name',
        dataIndex: 'FieldName',
        key: 'Name',
        editable: false,
        // sorter: function(a, b) { return (a.Name.localeCompare(b.Name)) },
        // sortOrder: sortedInfo.columnKey === 'Name' && sortedInfo.order,
        // ...getColumnSearchProps('Name')
    },
    {
        title: 'Description',
        dataIndex: 'Description',
        key: 'Description',
        editable: false,
        // sorter: function(a, b) { return (a.DeviceType.localeCompare(b.DeviceType)) },
        // sortOrder: sortedInfo.columnKey === 'DeviceType' && sortedInfo.order,
        // ...getColumnSearchProps('DeviceType')
    },
    {
        title: 'Exclude',
        // dataIndex: 'Description',
        key: 'Exclude',
        editable: false,
        // sorter: function(a, b) { return (a.Description.localeCompare(b.Description)) },
        // sortOrder: sortedInfo.columnKey === 'Description' && sortedInfo.order,
        // ...getColumnSearchProps('Description')
        render: (text, record) => {
            return <Checkbox checked={record.ExcludeFlag} onChange={(e) => handleExclude(e, record)} />
        }
    },
    {
        title: 'OPC Write Tag',
        dataIndex: 'OPCTagPath',
        editable: true,
    },
    {
        title: 'OPC Read Tag',
        dataIndex: 'OPCReadTagPath',
        editable: true,
    },
    {
        title: 'OPC Topic',
        dataIndex: 'OPCTopic',
        editable: true,
    },
    {
        title: 'Type',
        dataIndex: '',
        editable: false,
        width: 100,
        render: (text, record) => {
            let data = fieldTypes.find(data => data.Id === +record.Type);
            if (data) {
                return data.Name;
            }
            return null;
            // return <Select
            //     showSearch
            //     size='small'
            //     style={{ width: '100px' }}
            //     placeholder="Select a Field Type"
            //     optionFilterProp="children"
            //     onChange={handleFieldType.bind(this, record)}
            //     value={data ? data.Name: null}
            //     showSearch showArrow allowClear={false}
            // >
            //     {fieldTypes.map(field => <Option key={field.Id} value={field.Name}>{field.Name}</Option>)}
            // </Select>
        }
    },
    {
        title: 'Data Type',
        dataIndex: '',
        editable: false,
        render: (text, record) => {
            let data = datatypes.find(data => data.Id === +record.DataType);
            if (data) {
                return data.Name;
            }
            return null;

            // return (
            //     <Select
            //         showSearch
            //         size='small'
            //         style={{ width: '120px' }}
            //         placeholder="Select a Data Type"
            //         optionFilterProp="children"
            //         onChange={handleDataType.bind(this, record)}
            //         value={data ? data.Name : null}
            //         showSearch showArrow allowClear={false}
            //     >
            //         {datatypes.map(data => <Option key={data.Id} value={data.Name}>{data.Name}</Option>)}
            //     </Select>
            // );
        },
    },
    {
        title: 'Unit',
        dataIndex: 'Unit',
        editable: false,
    },
    {
        title: 'Default',
        dataIndex: 'Default',
        editable: true,
    },
    {
        title: 'Min',
        dataIndex: 'Min',
        editable: true,
    },
    {
        title: 'Max',
        dataIndex: 'Max',
        editable: true,
    },
    {
        title: 'Offset',
        dataIndex: 'Offset',
        editable: true,
    },
    {
        title: 'Scale',
        dataIndex: 'Scale',
        editable: true,
    },
    {
      title: 'Action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
            <span>
                {!(record.type === 'add') ? (<><a href="javascript:;" onClick={() => save(record.Id)} style={{ marginRight: 8, }} > <SaveOutlined style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}} /> </a>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}}>X</a>
                    </Popconfirm></>)
                    :null}
            </span>
            ) : (
                <div style={{ width: '40px' }}>
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}> <EditOutlined style={{ fontSize: '18px', color: 'green' }} /> </a>
                    {/* <a onClick={() => deleteRecord(record)}> <DeleteOutlined style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}}/> </a> */}
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
      <div className='EditableTable ProjectFields'>
        <div style={{ display: 'flex', padding: '8px 10px' }}>
            <Col span={4} style={{ color: 'green', fontWeight: 'bold' }} >Field Values</Col>
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
                bordered scroll={{ x: true }}
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{ style: {paddingRight: 15} }}
            />
        </Form>
    </div>
    );
};

export default EditableTable;