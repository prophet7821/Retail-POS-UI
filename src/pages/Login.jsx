import React, { useEffect } from "react";
import { Button, message, Form, Input, Row, Col } from "antd";
import "../resources/authentication.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    axios
      .post("https://starseed-pos-server.herokuapp.com/api/users/login", values)
      .then((res) => {
        message.success("Successfull");
        localStorage.setItem("pos-user", JSON.stringify(res.data));
        navigate("/home");
      })
      .catch((err) => message.error("Error Logging in"));
  };

  useEffect(() => {
    if (localStorage.getItem("pos-user")) navigate("/home");
  }, []);

  return (
    <div className="authentication">
      <Row className="">
        <Col lg={8} xs={22}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>SAM POS</h1>
            <hr />
            <h3>Login</h3>
            <Form.Item name="userId" label="User ID">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between">
              <Link to="/register">Not yet Registered?Click here</Link>
              <Button htmlType="submit" type="primary">
                Login
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
