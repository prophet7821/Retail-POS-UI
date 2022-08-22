import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch, useSelector } from "react-redux";
import { Button,message, Modal, Table, Form, Select, Input } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.rootReducer);
  const [subTotal, setSubtotal] = useState(0);
  const [billChargeOpen, setBillChargeOpen] = useState(false);
  const increaseQuantity = (record) => {
    dispatch({
      type: "updateCart",
      payload: { ...record, quantity: record.quantity + 1 },
    });
  };

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch({
        type: "updateCart",
        payload: { ...record, quantity: record.quantity - 1 },
      });
    }
  };

  const onFinish = (values) => {
    const reqObj = {
      ...values,
      subTotal,
      cartItems,
      tax:Number(((subTotal * 10) / 100).toFixed(2)),
      total:Number(subTotal + Number(((subTotal * 10) / 100).toFixed(2))),
      userId:JSON.parse(localStorage.getItem('pos-user'))._id,
    }
    // console.log(reqObj)
    axios
      .post("https://starseed-pos-server.herokuapp.com/api/bills/charge-bill", reqObj)
      .then(() => {
        message.success("Bill Charged Successfully");
        navigate('/home')
      })
      .catch(() => {
        message.error("Something went wrong");
      });
  };
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((item) => {
      temp = temp + item.price * item.quantity;
    });
    setSubtotal(temp);
  }, [cartItems]);

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
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div>
          <PlusOutlined
            className="mx-3"
            onClick={() => {
              increaseQuantity(record);
            }}
          />
          <b>{record.quantity}</b>
          <MinusOutlined
            className="mx-3"
            onClick={() => {
              decreaseQuantity(record);
            }}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined
          onClick={() => dispatch({ type: "deleteFromCart", payload: record })}
        />
      ),
    },
  ];
  return (
    <DefaultLayout>
      <h3>Cart</h3>
      <Table columns={columns} dataSource={cartItems} bordered />
      <hr />
      <div className="d-flex justify-content-end flex-column align-items-end">
        <div className="subtotal">
          <h3>
            Sub Total :<b>{subTotal}$</b>
          </h3>
        </div>
        <Button
          onClick={() => {
            setBillChargeOpen(true);
          }}
        >
          Charge Bill
        </Button>
      </div>

      <Modal
        title="Charge bill"
        visible={billChargeOpen}
        footer={false}
        onCancel={() => {
          setBillChargeOpen(false);
        }}
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="customerName" label="Customer Name">
            <Input />
          </Form.Item>
          <Form.Item name="customerMobileNumber" label="Phone Number">
            <Input />
          </Form.Item>
          <Form.Item name="paymentMode" label="Payment Mode">
            <Select>
              <Select.Option value="cash">Cash</Select.Option>
              <Select.Option value="card">Card</Select.Option>
            </Select>
          </Form.Item>
          <div className="charge-bill-amount">
            <h5>
              SubTotal :<b>{subTotal}</b>
            </h5>
            <h5>
              Tax:<b>{((subTotal * 10) / 100).toFixed(2)}</b>
            </h5>
            <hr />
            <h2>
              Total:<b>{subTotal + ((subTotal * 10) / 100).toFixed(2)}</b>
            </h2>
          </div>
          <div className="d-flex justify-content-end">
            <Button htmlType="submit" type="primary">
              Generate Bill
            </Button>
          </div>
        </Form>
      </Modal>
    </DefaultLayout>
  );
};

export default CartPage;
