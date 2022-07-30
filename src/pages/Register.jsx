import React from "react";
import { Button, message, Form, Input, Row, Col } from "antd";
import "../resources/authentication.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {useDispatch} from 'react-redux';
const Register = () => {
  const dispatch = useDispatch();


  const onFinish = (values) => {
    axios
      .post("http://localhost:5000/api/users/register",values)
      .then((res) => message.success("Successfull"))
      .catch((err) => message.error("Error registering"));
  };
  return (
    <div className="authentication">
      <Row className="">
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>SAM POS</h1>
            <hr />
            <h3>Register</h3>
            <Form.Item name="name" label="Name">
              <Input />
            </Form.Item>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/login">Already Registered?Click here to login</Link>
              <Button htmlType="submit" type="primary">
                Register
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
