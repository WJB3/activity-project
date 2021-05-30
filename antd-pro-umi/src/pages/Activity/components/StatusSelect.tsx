import React, { useState } from 'react'; 
import { Select } from 'antd';

const { Option } = Select;
 
const statusList=[
    {value:0,label:'准备募集'},
    {value:1,label:'募集中'},
    {value:2,label:'募集结束'},
]


const StatusSelect = (props: any) => {

    const {

    } = props;
 

    return (
        <Select>
            {
                statusList.map((item,index)=>(
                    <Option value={item.value} key={index}>{item.label}</Option>
                ))
            }  
        </Select>
    )

}

export default StatusSelect;