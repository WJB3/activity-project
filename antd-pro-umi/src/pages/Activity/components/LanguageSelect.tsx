import React, { useEffect, useState } from 'react'; 
import { Select } from 'antd';

const { Option } = Select;
 
const statusList=[
    {value:'all',label:'全部'},
    {value:'cn',label:'中文'},
    {value:'en',label:'英文'}, 
]


const LanguageSelect = (props: any) => {
 

    const [value,setValue]=useState('cn');

    useEffect(()=>{
        console.log("props.value",props.value)
        if(!props.value){
            props.onChange('cn');
        }else{
            setValue(props.value)
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