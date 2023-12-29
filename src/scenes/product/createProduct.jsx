import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { createProduct } from "../../api/functions/products";
import { getAllCategories } from "../../api/functions/categories";
import { useEffect, useState } from "react";

const CreateProduct = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesList = await getAllCategories();

        if (categoriesList.data) {
          setCategoriesData(categoriesList.data.data.categories);
          // console.log(categoriesList.data.data.categories);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);

  const handleFormSubmit = async (values) => {
    console.log("values => ", values);

    try {
      const res = await createProduct(values);

      if (res.data) {
        console.log("res data => ", res.data);
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE PRODUCT" subtitle="Create a New Product Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Title"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.title}
                name="title"
                error={!!touched.title && !!errors.title}
                helperText={touched.title && errors.title}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 4" }}
              />
              <FormControl
                fullWidth
                variant="filled"
                sx={{ gridColumn: "span 4" }}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                >
                  {/* <MenuItem value="salon">Salon</MenuItem>
                  <MenuItem value="lamp">Lamp</MenuItem>
                  <MenuItem value="livingRoom">Living Room</MenuItem> */}

                  {categoriesData &&
                    categoriesData.map((item, index) => (
                      <MenuItem value={item.name} key={index}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {/* Image Upload Input */}
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="image-upload"
                type="file"
                onChange={(event) => {
                  setFieldValue(
                    "image",
                    URL.createObjectURL(event.target.files[0])
                  );
                }}
              />
              <label htmlFor="image-upload">
                <Button component="span" color="primary" variant="contained">
                  Upload Image
                </Button>
              </label>
              {values.image && (
                <img
                  src={values.image}
                  alt="Preview"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              )}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  title: "",
  description: "",
  price: 0,
  category: "",
  image: "",
};

export default CreateProduct;
