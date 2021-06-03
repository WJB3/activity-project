//@ts-nocheck
import React, { useState,useRef,useContext,useEffect } from 'react';
import { Button, Table, Form,Input, message,InputNumber } from 'antd';
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
    type,
    ...restProps
}) => { 
    const inputRef = useRef(null);
    const form = useContext(EditableContext)!; 

    const save = async () => {
        try {
            const values = await form.validateFields(); 
            handleSave({ ...record, ...values });
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    if(record?.[dataIndex]){
        form.setFieldsValue({
            [dataIndex]:record[dataIndex]
        })
    }

    let childNode = children;
 
    if(type==='number'){
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
                <InputNumber ref={inputRef} onPressEnter={save} onBlur={save}  />
            </Form.Item>
        )  
    }

    return <td {...restProps}>{childNode}</td>;
};

const FinancialForm = (props: any) => {

    const [dataSource, setDataSource] = useState([
        // {
        //     key: 0, 
        //     title:'',
        //     content:''
        // }
    ]);

    useEffect(()=>{
        setDataSource((props.value||[]))
    },[props.value])

    const handleDelete=(record)=>{
        // if(dataSource.length===1){
        //     message.error('至少要传一个公司！')
        //     return ;
        // }
        const newData = [...dataSource];
        const index = newData.findIndex(item => record.key === item.key);
        newData.splice(index, 1);
        setDataSource(newData)
        props.onChange(newData)
    }

    const [count,setCount]=useState(1);

    const emptyObj={
        year:'',total:'',liabilityratio:'',operatingactivities:'',operatingincome:'',netprofit:''
    }

    const columns = [
        {
            title: '财务情况',
            dataIndex: 'year', 
            type: 'number',
        }, 
        {
            title: '总资产',
            dataIndex: 'total', 
            type: 'number',
        },
        {
            title: '资产负债率',
            dataIndex: 'liabilityratio', 
            type: 'number',
        },  
        {
            title: '经营活动净现金流',
            dataIndex: 'operatingactivities', 
            type: 'number',
        },  
        {
            title: '营业收入',
            dataIndex: 'operatingincome', 
            type: 'number',
        },
        {
            title: '净利润',
            dataIndex: 'netprofit', 
            type: 'number',
        },
        {
            title: '操作', 
            dataIndex: 'action',
            render:(text,record)=>{
                return <Button danger size="small" onClick={()=>handleDelete(record)}>删除</Button>
            }
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
          ...emptyObj
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
                type:col.type,
                handleSave: handleSave,
            }),
        };
    });
 
    console.log("dataSource",dataSource)

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                增加财务情况
            </Button>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={newColumns}
                scroll={{ x: 1300 }}
            />
        </div>
    )

}

export default FinancialForm;