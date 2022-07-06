import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Container,
  Typography,
  Box,
  Stack,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Alert } from "@mui/material";

function DetailPage() {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();
  const API_KEY ="52b19eb0f0c5268812c35edb167f968d";

  useEffect(() => {
    if (params.id) {
      const getProduct = async () => {
        setLoading(true);
        try {
          const res = await apiService.get(`${params.id}?api_key=${API_KEY}`);
          setMovie(res.data);
          setError("");
        } catch (error) {
          console.log(error);
          setError(error.message);
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [params]);

  return (
    <Container sx={{ my: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Movie app
        </Link>
        <Typography color="text.primary">{movie?.title}</Typography>
      </Breadcrumbs>
      <Box sx={{ position: "relative", height: 1 }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {movie && (
                  <Card>
                    <Grid container>
                      <Grid item xs={12} md={6}>
                        <Box p={2}>
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: "hidden",
                              display: "flex",
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                width: 1,
                                height: 1,
                              }}
                              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                              alt="movie"
                            />
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography variant="h5" paragraph>
                          {movie.title}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          sx={{ mb: 2 }}
                        >
                          <Rating
                            value={(movie.vote_average/2)}
                            precision={1}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            ({movie.vote_count} reviews)
                          </Typography>
                        </Stack>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                        release date : {movie.release_date}
                        </Typography>
                        <Typography variant="h5" sx={{ mb: 3 }}>
                          runtime : {movie.runtime} minute
                        </Typography>

                        <Divider sx={{ borderStyle: "dashed" }} />
                        <Box>
                          genres: 
                          <Typography sx = {{display: 'flex'}} variant="h6" paragraph>
                            {movie.genres.map((genre,index) =>(
                              <li key = {genre.id}>{genre.name } {index + 1 !== movie.genres.length && ', '}</li>
                            ))}
                          </Typography>
                        </Box>
                        <Typography variant="h7" paragraph>
                           {movie.overview}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                )}
                {!movie && (
                  <Typography variant="h6">404 Movie not found</Typography>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Container>
  );
}

export default DetailPage;