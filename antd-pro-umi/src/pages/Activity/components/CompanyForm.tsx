//@ts-nocheck
import React, { useState,useRef,useContext,useEffect } from 'react';
import { Button, Table, Form,Input } from 'antd';
const EditableContext = React.createContext(null);


const EditableRow = ({ index, ...props }: any) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
}) => {
    console.log("EditableCell")
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext)!;

 

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
        try {
            const values = await form.validateFields(); 
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode =  (
            <Form.Item
                style={{ margin: 0 }}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `${title}必填.`,
                    },
                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save} />
            </Form.Item>
        )  
    }

    return <td {...restProps}>{childNode}</td>;
};

const CompanyForm = (props: any) => {

    const [dataSource, setDataSource] = useState([
        {
            key: 0,
            name: '',
            whereadress: '',
            stockcode: '',
            registeradress: '',
            ratingagencies: '',
            latestrating: '',
            historyrating: '',
        }
    ])

    const [count,setCount]=useState(1);

    const columns = [
        {
            title: '公司名称',
            dataIndex: 'name', 
            editable: true,
        },
        {
            title: '上市地点',
            dataIndex: 'whereadress',
            editable: true,
        },
        {
            title: '股票代码',
            dataIndex: 'stockcode',
            editable: true,
        }, 
        {
            title: '注册地址',
            dataIndex: 'registeradress',
            editable: true,
        }, 
        {
            title: '评级机构',
            dataIndex: 'ratingagencies',
            editable: true,
        },
        {
            title: '最新评级',
            dataIndex: 'latestrating',
            editable: true,
        }, 
        {
            title: '历史评级',
            editable: true,
            dataIndex: 'historyrating',
        },   
    ]; 

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData)
        props.onChange(newData)
    }

    const handleAdd = () => { 
        const newData = {
          key: count,
          name: '',
          whereadress: '',
          stockcode: '',
          registeradress: '',
          ratingagencies: '',
          latestrating: '',
          historyrating: '',
        };
        setDataSource([...dataSource, newData])
        props.onChange([...dataSource, newData])
        setCount(count+1); 
    }

 
    const newColumns = columns.map(col => {
        return {
            ...col,
            onCell: (record: DataType) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: handleSave,
            }),
        };
    });
 

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                增加公司
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={newColumns}
            />
        </div>
    )

}

export default CompanyForm;