import React, { useEffect, useState } from 'react'; 
import { Select } from 'antd';

const { Option } = Select;
 
const statusList=[
    {value:'stock',label:'股权'},
    {value:'debt',label:'债权'}, 
]


const StockSelect = (props: any) => { 

    const [value,setValue]=useState('stock');

    useEffect(()=>{
        if(!props.value){
            props.onChange('stock');
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

export default StockSelect;