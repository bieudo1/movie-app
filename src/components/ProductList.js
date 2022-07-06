import { Grid } from "@mui/material";
import ProductCard from "./ProductCard";

function ProductList({ movies, loading }) {
  return (
    <Grid container spacing={0.5} sx = {{maxWidth: "100%"}} mt={1}>
      {movies.map((movie, index) => (
        <Grid key={movie.id} item  sm={3} md={3}>
          <ProductCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;