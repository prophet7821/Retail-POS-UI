import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col, Table, Button, message ,Modal, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const Items = () => {
  const [itemData, setItemData] = useState([]);
  const [addEditModalOpen, setAddEditModalOpen] = useState(false);
  const dispatch = useDispatch();

  const getAllItems=()=>{
    dispatch({ type: "showLoading" });
    axios
      .get("http://localhost:5000/api/items/get-all-items")
      .then((response) => {
        dispatch({ type: "hideLoading" });
        setItemData(response.data);
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        console.log(error);
      });
  }
  useEffect(() => {
    getAllItems();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      Image: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt="" height="60" width="60" />
      ),
    },
    {
      title: "price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className="d-flex">
          <DeleteOutlined className="mx-2" />
          <EditOutlined className="mx-2" />
        </div>
      ),
    },
  ];

  const onFinish=(values)=>{
    dispatch({ type: "showLoading" });
    axios
      .post("http://localhost:5000/api/items/add-item",values)
      .then((response) => {
        dispatch({ type: "hideLoading" });
        message.success('Item added sucessfully');
        setAddEditModalOpen(false);
        getAllItems();
      })
      .catch((error) => {
        dispatch({ type: "hideLoading" });
        message.error("Something went wrong");
        console.log(error);
      });
  }
  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h3>Items</h3>
        <Button
          type="primary"
          onClick={() => {
            setAddEditModalOpen(true);
          }}
        >
          Add Item
        </Button>
      </div>
      <Table columns={columns} dataSource={itemData} bordered />
      <Modal
        onCancel={() => {
          setAddEditModalOpen(false);
        }}
        visible={addEditModalOpen}
        title="Add New Item"
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Form.Item name="image" label="Image URL">
            <Input />
          </Form.Item>
          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value="fruits">Fruits</Select.Option>
              <Select.Option value="vegetables">Vegetables</Select.Option>
              <Select.Option value="meat">Meat</Select.Option>
            </Select>
          </Form.Item>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default Items;
