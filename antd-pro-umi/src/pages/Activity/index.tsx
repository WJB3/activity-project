
import React, { useEffect, useRef, useState } from 'react';
import { Table, Tag, Input, Popconfirm, Card, Button, Drawer, InputNumber, Form, Row, Col, Image, Space, message, } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ImagePicker from './components/ImagePicker';
import HightlightsForm from './components/HighlightForm';
import StatusSelect from './components/StatusSelect';
import LanguageSelect from './components/LanguageSelect';
import StockSelect from './components/StockSelect'
import FinancialForm from './components/FinancialForm'
import { add, getList, deleteItem } from '@/services/activity';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const allLayout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 22 },
}


const TableList: React.FC = () => {

  const [dataSource, setDataSource] = useState([]);

  const [_, forceUpdate] = useState([]);

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

  const handleReset=()=>{
    form.resetFields();
  }

  const handleDelete = (record: any) => {
    deleteItem(record.id).then(res => {
      message.success('活动删除成功！');
      forceUpdate([]);
    })
  }

  const columns = [
    {
      title: '活动名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '活动图片',
      dataIndex: 'title_img',
      key: 'title_img',
      render: (text: any) => {
        return <Image src={text} width={100} height={100} />
      }
    },
    {
      title: '活动部门',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: '募集状态',
      dataIndex: 'formstatus',
      render: (text: string | number) => {
        console.log("text", text)
        if (text == 1) {
          return <Tag color="warning">{'准备募集'}</Tag>
        } else if (text == 2) {
          return <Tag color='blue'>{'募集中'}</Tag>
        } else if (text == 3) {
          return <Tag color="success">{'募集结束'}</Tag>
        } else {
          return <Tag color="error">{'异常'}</Tag>
        }
      }
    },

    {
      title: '活动内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '融资目标',
      dataIndex: 'fundingTarget',
      key: 'fundingTarget',
    },
    {
      title: '活动横幅',
      dataIndex: 'banner',
      key: 'banner',
      render: (text: any) => {
        return <Image src={text} width={100} height={100} />
      }
    },
    {
      title: '活动承接',
      dataIndex: 'underwrite',
      key: 'underwrite',
    },
    {
      title: '活动网站',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: '公司logo',
      dataIndex: 'company_logo',
      key: 'company_logo',
      render: (text: any) => {
        return <Image src={text} width={100} height={100} />
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (text: string | number) => {
        if (text == 0) {
          return <Tag color="warning">{'待审核'}</Tag>
        } else if (text == 1) {
          return <Tag color="warning">{'审核通过'}</Tag>
        } else {
          return <Tag color="error">{'异常'}</Tag>
        }
      }
    },
    // {
    //   title: '活动口号',
    //   dataIndex: 'slogan',
    //   key: 'slogan',
    // },
    {
      status: '操作',
      dataIndex: 'action',
      render: (text: string, record) => {
        return (
          <Space>
            <Popconfirm
              title="确定要删除此活动吗，删除后不可恢复?"
              onConfirm={() => handleDelete(record)}
              okText="确定"
              cancelText="取消"
            >
              <Button danger size={"small"} >删除</Button>
            </Popconfirm>
          </Space>
        )
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
  }, [pagination.pageSize, pagination.current, _]);

  const onFinish = (values: any) => {
    console.log("onFinish", values)
    add(values).then(res => {
      message.success('创建任务成功');
      form.resetFields();
      forceUpdate([]);
      setFormVisible(false);
    })
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
          {...layout}
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
            <Col span={6} key={2}>
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
                name={`formstatus`}
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
            <Col span={6} key={4}>
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
                <Input.TextArea placeholder={"请输入活动内容"} autoSize={{ minRows: 3 }} />
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
                <Input.TextArea placeholder={"请输入活动口号"} autoSize={{ minRows: 3 }} />
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
            <Col span={6} key={8}>
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
                <Input.TextArea placeholder={"请输入活动口号"} autoSize={{ minRows: 3 }} />
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
            <Col span={6} key={18}>
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
            </Col>
            <Col span={6} key={19}>
              <Form.Item
                name={`type`}
                label={`债券类型`}
                rules={[
                  {
                    required: true,
                    message: '债券类型必填!',
                  },
                ]}
              >
                <StockSelect />
              </Form.Item>
            </Col>
            <Col span={6} key={20}>
              <Form.Item
                name={`language`}
                label={`语言`}
                rules={[
                  {
                    required: true,
                    message: '语言必填!',
                  },
                ]}
              >
                <LanguageSelect />
              </Form.Item>
            </Col>
            <Col span={24} key={21} >
              <Form.Item
                {...allLayout}
                name={`highlights`}
                label={`亮点`}
                rules={[
                  {
                    required: false,
                    message: '亮点必填!',
                  },
                ]}
              >
                <HightlightsForm />
              </Form.Item>
            </Col>
            <Col span={24} key={22} >
              <Form.Item
                {...allLayout}
                name={`financial_disclosure`}
                label={`资产信息`}
                rules={[
                  {
                    required: true,
                    message: '资产信息必填!',
                  },
                ]}
              >
                <FinancialForm />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <div style={{ display: 'flex', justifyContent: 'center',width: '90%' }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  提交
            </Button>
                <Button onClick={handleReset}>
                  重置
            </Button>
              </Space>
            </div>
          </Row>
        </Form>
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
