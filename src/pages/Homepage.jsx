import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { Row, Col } from "antd";
import Item from "../components/Item";
import "../resources/items.css";
import { useDispatch } from "react-redux";

const Homepage = () => {
  const [itemData, setItemData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("fruits");
  const categories = [
    {
      name: "fruits",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg",
    },
    {
      name: "vegetables",
      imageURL:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/shopping-bag-full-of-fresh-vegetables-and-fruits-royalty-free-image-1128687123-1564523576.jpg",
    },
    {
      name: "meat",
      imageURL:
        "https://images.ctfassets.net/3s5io6mnxfqz/5GlOYuzg0nApcehTPlbJMy/140abddf0f3f93fa16568f4d035cd5e6/AdobeStock_175165460.jpeg?fm=jpg&w=900&fl=progressive",
    },
  ];
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
      <div className="d-flex">
        {categories.map((category) => {
          return (
            <div
            onClick={()=>{setSelectedCategory(category.name)}}
              className={`d-flex category ${
                selectedCategory === category.name && "selectedcategory"
              }`}
            >
              <h4>{category.name}</h4>
              <img src={category.imageURL} alt="" height="60" width="80" />
            </div>
          );
        })}
      </div>
      <Row gutter={20}>
        {itemData.filter((i=>i.category==selectedCategory)).map((item) => {
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
