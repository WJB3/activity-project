import React, { useEffect, useState } from 'react'; 
import { Select } from 'antd';

const { Option } = Select;
 
const statusList=[
    {value:1,label:'准备募集'},
    {value:2,label:'募集中'},
    {value:3,label:'募集结束'},
]


const StatusSelect = (props: any) => {
 

    const [value,setValue]=useState(1);

    useEffect(()=>{
        if(!props.value){
            props.onChange(1);
        }
        if(props.value){
            setValue(Number(props.value))
        }
    },[props.value])
 
    const handleChange=(value:any)=>{ 
        setValue(value);
        props.onChange(value);
    }

    return (
        <Select value={value} onChange={handleChange}>
            {
                statusList.map((item,index)=>(
                    <Option value={item.value} key={index}>{item.label}</Option>
                ))
            }  
        </Select>
    )

}

export default StatusSelect;