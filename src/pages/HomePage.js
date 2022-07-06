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
  const [fetchMovies , setFetchMovies ] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const defaultValues = {
    genre: null,
    searchQuery: ""
  };
  const methods = useForm({
    defaultValues,
  });
  const { watch } = methods;
  const filters = watch();
  const API_KEY ="52b19eb0f0c5268812c35edb167f968d"
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const search = {
    name : "search" ,
    variable : "query" ,
    data : filters.searchQuery
  }
  const discover = {
    name : "discover" ,
    variable :" with_genres" ,
    data : filters.genre
  }
  useEffect(() => {
    const getFetchMovies= async () => {
      setLoading(true);
      try {
        const type = filters.searchQuery ? search : discover;
        const listsMovie = await apiService.get( `https://api.themoviedb.org/3/${type.name}/movie?api_key=${API_KEY}&page=${page}&${type.variable}=${type.data}`);
        setFetchMovies(listsMovie.data.results);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.message);
      }
      setLoading(false);
    };
    getFetchMovies();
  }, [page]);

  return (
    <Container sx={{ display: "flex", minHeight: "100vh", mt: 2,flexDirection: {xs:"column", md:"row"}  }}>
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
                <ProductList movies={fetchMovies} />
              )}
            </>
          )}
        </Box>
          <Pagination  page={page} handleChange={handleChange} />
      </Stack>
    </Container>
  );
}

export default HomePage;