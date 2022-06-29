import React, { useState, useEffect } from "react";
import { Alert, Box, Container, Stack } from "@mui/material";
import ProductFilter from "../components/ProductFilter";
import ProductSearch from "../components/ProductSearch";
import ProductList from "../components/ProductList";
import { FormProvider } from "../components/form";
import { useForm } from "react-hook-form";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import Pagination from "../components/Pagination";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const defaultValues = {
    genre: 0,
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch } = methods;
  const filters = watch();
  const filterProducts = applyFilter(products, filters);
  const API_KEY ="52b19eb0f0c5268812c35edb167f968d"
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const listsMovie = await apiService.get( `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}`);
        const listsSearch =  await apiService.get (`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${filters.searchQuery || "searchmovie" }&page=${page}`);
      
        const res =(listsSearch.data.total_pages !== 0 ? listsSearch : listsMovie );
        console.log("b", res);
        setProducts(res.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getProducts();
  }, [filters.searchQuery,page]);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 3 }}>
      <Stack>
        <FormProvider methods={methods}>
          <ProductFilter/>
        </FormProvider>
      </Stack>
      <Stack sx={{ flexGrow: 1 }}>
        <FormProvider methods={methods}>
          <Stack
            spacing={2}
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            mb={2}
          >
            <ProductSearch />
          </Stack>
        </FormProvider>
        <Box sx={{ position: "relative", height: 1 }}>
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {error ? (
                <Alert severity="error">{error}</Alert>
              ) : (
                <ProductList products={filterProducts} />
              )}
            </>
          )}
        </Box>
          <Pagination  page={page} handleChange={handleChange} />
      </Stack>
    </Container>
  );
}

function applyFilter(products, filters) {
  let filteredProducts = products;
  if (Number(filters.genre )!== 0) {
    filteredProducts = products.filter((product) =>
      product.genre_ids.includes(Number(filters.genre))
    );
  }
  return filteredProducts;
}
export default HomePage;