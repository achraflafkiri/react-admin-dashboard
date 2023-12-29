import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { getAllProducts } from "../../api/functions/products";
import { getAllCategories } from "../../api/functions/categories";

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prods = await getAllProducts();
        if (prods.data) {
          setProductData(prods.data.data.products);
          // console.log(prods.data.data.products);
        }
        const cats = await getAllCategories();
        if (cats.data) {
          console.log(cats.data.data.categories);
          setCategoriesList(cats.data.data.categories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  const bufferToDataURL = (buffer) => {
    const base64 = btoa(
      new Uint8Array(buffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    );
    return `data:image/jpeg;base64,${base64}`;
  };

  return (
    <Box m="20px">
      <Header title="PRODUCTS LIST" subtitle="Products Table" />

      <TableContainer component={Paper} mt="20px">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData &&
              productData.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product.titleEN}</TableCell>
                  <TableCell>{product.descriptionEN}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  {categoriesList &&
                    categoriesList.map((item, index) => (
                      <TableCell>{item.name}</TableCell>
                    ))}
                  <TableCell>
                    {product.image && (
                      <img
                        src={bufferToDataURL(product.image.data)}
                        alt={`Product ${index}`}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {/* Add any action buttons or links here */}
                    <Button variant="outlined" color="primary">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Products;
