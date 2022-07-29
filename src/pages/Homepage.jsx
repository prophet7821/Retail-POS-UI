import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemData, setItemData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
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
  }, []);

  return (
    <DefaultLayout>
      <Row gutter={20}>
        {itemData.map((item) => {
          return (
            <Col span={6} lg={6} md={8} sm={12} xs={24}>
              <Item item={item} />
            </Col>
          );
        })}
      </Row>
    </DefaultLayout>
  );
};

export default Homepage;
