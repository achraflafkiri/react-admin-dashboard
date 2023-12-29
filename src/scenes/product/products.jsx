import React from "react";
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

const products = () => {
  // Sample product data
  const productData = [
    {
      title: "Product 1",
      description: "Description 1",
      price: 50,
      category: "salon",
      imageUrl: "https://images.unsplash.com/photo-1586702107743-",
    },
    {
      title: "Product 2",
      description: "Description 2",
      price: 75,
      category: "lamp",
      imageUrl: "https://images.unsplash.com/photo-1586702107743-",
    },
    // Add more products as needed
  ];

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
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productData.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={`Product ${index}`}
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
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

export default products;
