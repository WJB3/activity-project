 
import React, { useEffect, useState } from 'react'; 
import { Table,Tag } from 'antd';
import { PageContainer } from '@ant-design/pro-layout'; 
import { getList } from '@/services/user' 
 

const TableList: React.FC = () => { 


  const [ dataSource,setDataSource ]=useState([]); 

  const [loading,setLoading]=useState(false);

  const [pagination,setPagination]=useState({
    pageSize:10,
    current:1,
    total:10
  });

  const handleChangeTable=(pagination:any)=>{
    console.log("handleChangeTable",pagination)
    setPagination(pagination)
  }
    
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username', 
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone', 
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email', 
    }, 
    {
      status:'状态',
      dataIndex:'status',
      render:(text:string)=>{
        if(text==='1'){
          return <Tag color="success">{'正常'}</Tag>
        }else{
          return <Tag color="error">{'异常'}</Tag>
        }
      }
    }
  ]; 

  useEffect(()=>{
    setLoading(true);
    getList({
      pageSize:pagination.pageSize,
      pageNum:pagination.current
    }).then(({data,total})=>{
      setLoading(false);
      setDataSource(data); 
      setPagination({
        pageSize:pagination.pageSize,
        current:pagination.current,
        total
      })
    }).catch(e=>setLoading(false))
  },[pagination.pageSize,pagination.current]);

  
  return (
    <PageContainer>
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        rowKey={'id'}
        pagination={pagination}
        onChange={handleChangeTable}
        loading={loading}
      />
    </PageContainer>
  );
};

export default TableList;
