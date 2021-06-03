//@ts-nocheck
import React, { useState,useRef,useContext,useEffect } from 'react';
import { Button, Table, Form,Input, message } from 'antd';
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
    console.log("EditableCell")
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext)!;

    if(record?.[dataIndex]){
        form.setFieldsValue({
            [dataIndex]:record[dataIndex]
        })
    }

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
    }else if(type==='textarea'){
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
                <Input.TextArea autoSize ref={inputRef} onPressEnter={save} onBlur={save} autoSize={{ minRows: 3 }} />
            </Form.Item>
        )  
    }

    return <td {...restProps}>{childNode}</td>;
};

const CompanyForm = (props: any) => {

    const [dataSource, setDataSource] = useState([
        // {
        //     key: 0, 
        //     title:'',
        //     content:''
        // }
    ]);

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

    useEffect(()=>{ 
        setDataSource((props.value||[])) 
    },[props.value])

    const columns = [
        {
            title: '标题',
            dataIndex: 'title', 
            editable: true,
        },
        {
            title: '内容',
            dataIndex: 'content', 
            type:'textarea'
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
          title: '', 
          content:''
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

    return (
        <div>
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                增加亮点
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