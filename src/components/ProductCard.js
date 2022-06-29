import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import genres from "../db.json";
// import { fCurrency } from "../utils";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`${product.id}`)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="278"
          width = "185"
          image={`https://image.tmdb.org/t/p/w185///${product.poster_path}`}
          alt="green iguana"
        />
        <CardContent sx = {{height: "110"}}>
          <Typography gutterBottom variant="body1" component="div" noWrap>
            {product.title}
          </Typography>
          <Typography sx = {{display: 'flex'}}>
					{product.genre_ids.map((id, index) => {
						const item = genres.filter(genre => genre.id === id);
						if (item.length > 0) 
							return (
								<li key={id}>{ item.shift().name}{index + 1 !== product.genre_ids.length && ', '}</li>
							)
						return null;
					})}
          
        </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;