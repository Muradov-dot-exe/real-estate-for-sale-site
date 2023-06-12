import { Box, Divider, Typography } from "@mui/material";
import DataTableComponent from "../components/DataTableComponent";

const ProductsPages = () => {
  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Typography sx={{ fontWeight: "bold" }}>Available Products</Typography>
      </Box>
      <Divider />
      <Box>
        <DataTableComponent />
      </Box>
    </>
  );
};

export default ProductsPages;
