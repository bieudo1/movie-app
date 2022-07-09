import * as React from "react";
import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import apiService from "../app/apiService";


function ProductCard({ movie }) {

  const [genres, setGenres] = React.useState([]);

  React.useEffect(() =>{
    const getdata = async () =>{
      try {
        const red = await apiService.get (`https://api.themoviedb.org/3/genre/movie/list?api_key=52b19eb0f0c5268812c35edb167f968d`);
        setGenres(red.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    getdata();
  },[]);
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`${movie.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100%"
          width = "100%"
          image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt="green iguana"
        />
        <Typography sx = {{fontSize: "0.8rem"}}  gutterBottom variant="body1" component="h2">
            {movie.title}
        </Typography>
        <Typography sx = {{display: 'flex',fontSize: "0.6rem"}}>
					{movie.genre_ids.map((id, index) => {
						const item = genres.filter(genre => genre.id === id);
						if (item.length > 0) 
							return (
								<li key={id}>{ item.shift().name}{index + 1 !== movie.genre_ids.length && ', '}</li>
							)
						return null;
					})}
          
        </Typography>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;