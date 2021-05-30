
import React, { useEffect, useRef, useState } from 'react';
import { Table, Tag, Input, Card, Button, Drawer, Form, Row, Col, InputNumber, Space, } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ImagePicker from './components/ImagePicker';
import CompanyForm from './components/CompanyForm';
import StatusSelect from './components/StatusSelect';
import { add } from '@/services/activity';
import { getList } from '@/services/user'; 


const TableList: React.FC = () => {

  const [dataSource, setDataSource] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formVisible, setFormVisible] = useState(false);

  const [form] = Form.useForm();

  const [pagination, setPagination] = useState({
    pageSize: 10,
    current: 1,
    total: 10
  });

  const handleChangeTable = (pagination: any) => {
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
      status: '状态',
      dataIndex: 'status',
      render: (text: string) => {
        if (text === '1') {
          return <Tag color="success">{'正常'}</Tag>
        } else {
          return <Tag color="error">{'异常'}</Tag>
        }
      }
    }
  ];

  const handleAdd = () => {
    setFormVisible(true);
  }

  const handleClose = () => {
    setFormVisible(false);
  }

  useEffect(() => {
    setLoading(true);
    getList({
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    }).then(({ data, total }) => {
      setLoading(false);
      setDataSource(data);
      setPagination({
        pageSize: pagination.pageSize,
        current: pagination.current,
        total
      })
    }).catch(e => setLoading(false))
  }, [pagination.pageSize, pagination.current]);

  const onFinish=(values:any)=>{
    console.log("onFinish",values)
    add(values)
  }

  return (
    <PageContainer>
      <Card>
        <Button type="primary" onClick={handleAdd}>增加活动</Button>
      </Card>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={'id'}
        pagination={pagination}
        onChange={handleChangeTable}
        loading={loading}
      />
      <Drawer
        title="增加活动"
        placement="right"
        visible={formVisible}
        onClose={handleClose}
        width={'90%'}
      >
        <Form
          form={form}
          name="activity_form"
          onFinish={onFinish}
        >
          <Row gutter={20}>
            <Col span={6} key={0}>
              <Form.Item
                name={`title`}
                label={`标题`}
                rules={[
                  {
                    required: true,
                    message: '标题必填!',
                  },
                ]}
              >
                <Input
                  placeholder="请输入标题"
                />
              </Form.Item>
            </Col>
            <Col span={6} key={1}>
              <Form.Item
                name={`title_img`}
                label={`活动图片必传`}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <ImagePicker />
              </Form.Item>
            </Col>
            {/* <Col span={6} key={2}>
              <Form.Item
                name={`sector`}
                label={`活动部门`}
                rules={[
                  {
                    required: true,
                    message: '活动部门必填!',
                  },
                ]}
              >
                <Input
                  placeholder="请输入活动部门"
                />
              </Form.Item>
            </Col>

            <Col span={6} key={3}>
              <Form.Item
                name={`status`}
                label={`活动状态`}
                rules={[
                  {
                    required: true,
                    message: '活动状态必填!',
                  },
                ]}
              >
                <StatusSelect />
              </Form.Item>
            </Col>
            <Col span={12} key={4}>
              <Form.Item
                name={`content`}
                label={`活动内容`}
                rules={[
                  {
                    required: true,
                    message: '活动内容必填!',
                  },
                ]}
              >
                <Input.TextArea placeholder={"请输入活动内容"} autoSize={{ minRows: 5 }} />
              </Form.Item>
            </Col>
            <Col span={6} key={5}>
              <Form.Item
                name={`fundingTarget`}
                label={`融资目标`}
                rules={[
                  {
                    required: true,
                    message: '融资目标必填!',
                  },
                ]}
              >
                <InputNumber placeholder={"请输入融资目标"} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6} key={6}>
              <Form.Item
                name={`slogan`}
                label={`活动口号`}
                rules={[
                  {
                    required: true,
                    message: '活动口号必填!',
                  },
                ]}
              >
                <Input.TextArea placeholder={"请输入活动口号"} autoSize={{ minRows: 5 }} />
              </Form.Item>
            </Col>
            <Col span={6} key={7}>
              <Form.Item
                name={`banner`}
                label={`活动横幅`}
                rules={[
                  {
                    required: true,
                    message: '活动横幅必填!',
                  },
                ]}
              >
                <ImagePicker />
              </Form.Item>
            </Col>
            <Col span={12} key={8}>
              <Form.Item
                name={`overview`}
                label={`活动概述`}
                rules={[
                  {
                    required: true,
                    message: '活动概述必填!',
                  },
                ]}
              >
                <Input.TextArea placeholder={"请输入活动口号"} autoSize={{ minRows: 5 }} />
              </Form.Item>
            </Col>
            <Col span={6} key={9}>
              <Form.Item
                name={`underwrite`}
                label={`活动承接`}
                rules={[
                  {
                    required: true,
                    message: '活动承接必填!',
                  },
                ]}
              >
                <Input placeholder={"请输入活动承接"} />
              </Form.Item>
            </Col>
            <Col span={6} key={10}>
              <Form.Item
                name={`website`}
                label={`活动网站`}
                rules={[
                  {
                    required: true,
                    message: '活动网站必填!',
                  },
                ]}
              >
                <Input placeholder={"请输入活动网站"} />
              </Form.Item>
            </Col>
            <Col span={6} key={11}>
              <Form.Item
                name={`company_logo`}
                label={`公司logo`}
                rules={[
                  {
                    required: true,
                    message: '公司logo必填!',
                  },
                ]}
              >
                <ImagePicker />
              </Form.Item>
            </Col> */}
            <Col span={24} key={12}>
              <Form.Item
                name={`highlights`}
                label={`公司`}
                rules={[
                  {
                    required: true,
                    message: '公司必填!',
                  },
                ]}
              >
                <CompanyForm />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Space>
              <Button type="primary" htmlType="submit">
                提交
            </Button>
              <Button>
                重置
            </Button>
            </Space>
          </Row>
        </Form>
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
