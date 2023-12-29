import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllCategories } from "../../api/functions/categories";
import {
  FormControl,
  InputLabel,
  Input,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import Header from "../../components/Header";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    titleEN: "",
    descriptionEN: "",
    price: 0,
    categoryId: "",
    image: null,
  });

  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const catList = await getAllCategories();
      if (catList.data) {
        setCategoriesList(catList.data.data.categories);
      }
    };
    fetchData();
  }, []); // Add an empty dependency array to run the effect only once

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData({
      ...formData,
      categoryId,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("values => ", formData);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titleEN", formData.titleEN);
      formDataToSend.append("descriptionEN", formData.descriptionEN);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("categoryId", formData.categoryId);
      formDataToSend.append("image", formData.image);

      const response = await axios.post(
        "http://localhost:8080/api/v1/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response:", response.data);
      // You can add logic here for handling the response if needed
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error appropriately
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="C" />

      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="titleEN">Title (EN):</InputLabel>
          <Input
            type="text"
            id="titleEN"
            name="titleEN"
            value={formData.titleEN}
            onChange={handleInputChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="descriptionEN">Description (EN):</InputLabel>
          <TextareaAutosize
            id="descriptionEN"
            name="descriptionEN"
            value={formData.descriptionEN}
            onChange={handleInputChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="price">Price:</InputLabel>
          <Input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="categoryId">Category:</InputLabel>
          <Select
            id="categoryId"
            className="form-select"
            label="Category"
            value={formData.categoryId}
            onChange={handleCategoryChange}
          >
            <MenuItem value="" disabled>
              Select a category
            </MenuItem>
            {categoriesList &&
              categoriesList.map((item, index) => (
                <MenuItem value={item.id} key={index}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <FormControl>
          <InputLabel htmlFor="image">Image:</InputLabel>
          <Input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
        </FormControl>
        <br />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default ProductForm;
