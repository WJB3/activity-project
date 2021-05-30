import React, { useEffect, useState } from 'react'; 
import { Select } from 'antd';

const { Option } = Select;
 
const statusList=[
    {value:'cn',label:'中文'},
    {value:'en',label:'英文'}, 
]


const LanguageSelect = (props: any) => {
 

    const [value,setValue]=useState('cn');

    useEffect(()=>{
        if(!props.value){
            props.onChange('cn');
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

export default LanguageSelect;