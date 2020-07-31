import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Button } from 'antd';
import RestAPI from '../../api';
import Highlighter from 'react-highlight-words';

import { SaveOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';

import './settings.less';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
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

const MaterialsTable = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({ columnKey: '', order: ''});
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const isEditing = record => record.Id === editingKey;

  const edit = record => {
    if (editingKey === record.Id) {
        return;
    }
    form.setFieldsValue({ ...record });
    setEditingKey(record.Id);
  };

  const add = async (record) => {
    delete record.type;
    const row = await form.validateFields();
    setLoading(true);
    RestAPI.addSemiProduct({
        params: {
          name: row.Name,
          width: row.Width,
          thickness: row.Thickness,
          length: row.Length
        }
      }).then(resp => {
        if (resp.status === 200) {
            getSubProducts();
        }
      }).catch(err => {
        console.log(err);
      });
  }

  const deleteSemiProduct = (record) => {
    setLoading(true);
    RestAPI.deleteSemiProduct({
        params: {
            id: record.Id
        }
    }).then(resp => {
            if (resp.status === 200) {
                getSubProducts();
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
  }

  useEffect(() => {
    setLoading(true);
    getSubProducts();
  }, []);

  const getSubProducts = () => {
    RestAPI.getSubProducts()
        .then(resp => {
            setLoading(false);
            if (resp.status === 200) {
                setData(addEmptyData(resp.data));
            }
        }).catch(err => {
            setLoading(false);
            console.log(err);
        });
  }

  const addEmptyData = (data) => {
    const allData = [...data];
    const newData = {
        Name: '',
        Width: '',
        Thinkness: '',
        Length: '',
        type: 'add'
    };
    allData.push(newData);
    form.resetFields();
    return allData;
  }

  const editProducts = (pdtValues = {}) => {
    setLoading(true);
    let data = {
        id: pdtValues.Id,
        name: pdtValues.Name,
        width: pdtValues.Width,
        thickness: pdtValues.Thickness,
        length: pdtValues.Length
    }
    RestAPI.updateSemiProduct({
        params: {
            ...data
        }
    }).then(resp => {
        getSubProducts();
        console.log(resp);
    }).catch(err => {
        setLoading(false);
        console.log(err);
    });
  }

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
        editProducts({...item, ...row});
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

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setSortedInfo(sorter);
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
      if (record[dataIndex] === null || record[dataIndex] === undefined) {
        return false
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
        text ? <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        /> : text
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      editable: true,
      key: 'Name',
      sorter: function(a, b) { 
        return (a.Name.localeCompare(b.Name)) 
      },
      sortOrder: sortedInfo.columnKey === 'Name' && sortedInfo.order,
      ...getColumnSearchProps('Name')
    },
    {
      title: 'Width',
      dataIndex: 'Width',
      editable: true,
      key: 'Width',
      // sorter: function(a, b) { 
      //   return (a.Width.localeCompare(b.Width)) 
      // },
      // sortOrder: sortedInfo.columnKey === 'Width' && sortedInfo.order,
      ...getColumnSearchProps('Width')
    },
    {
      title: 'Thickness',
      dataIndex: 'Thickness',
      editable: true,
      key: 'Thickness',
      // sorter: function(a, b) { 
      //   return (a.Thickness.localeCompare(b.Thickness)) 
      // },
      // sortOrder: sortedInfo.columnKey === 'Thickness' && sortedInfo.order,
      ...getColumnSearchProps('Thickness')
    },
    {
      title: 'Length',
      dataIndex: 'Length',
      editable: true,
      key: 'Length',
      // sorter: function(a, b) { 
      //   if (!a.Length) {
      //     a.Length = '';
      //   }
      //   if (!b.Length) {
      //     b.Length = '';
      //   }
      //   return (a.Length.localeCompare(b.Length)) 
      // },
      // sortOrder: sortedInfo.columnKey === 'Length' && sortedInfo.order,
      ...getColumnSearchProps('Length')
    },
    {
      title: 'Actions',
      dataIndex: 'Actions',
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
                    <a onClick={() => deleteSemiProduct(record)}> <DeleteOutlined style={{ fontSize: '18px', color: 'green', padding: '3px 1rem'}}/> </a>
                </div>
            )
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
      <div className='MaterialsTable'>
        <Form form={form} component={false}>
            <Table
                loading={loading}
                onChange={handleChange}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                // pagination={{
                //   onChange: cancel,
                // }}
                pagination={{ position: ['topRight'] }} scroll={{ y: props.contentHeight + 40, x: 'scroll' }}
            />
        </Form>
      </div>
  );
};

export default MaterialsTable;
