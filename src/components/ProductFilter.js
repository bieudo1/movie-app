import {  Stack, Typography } from "@mui/material";
import { FRadioGroup } from "./form";

// import genders from "../db.json"


export const FILTER_GENDER_OPTIONS = [
 {value: 0, label: "ALL" },
 {value: 28, label: "Action" },
 {value: 12,label: "Adventure"},
 {value: 16,label: "Animation"},
 {value: 35,label: "Comedy"},
{value: 80,label: "Crime"},
{value: 99,label: "Documentary"},
{value: 18,label: "Drama"},
{value: 10751,label: "Family"},
{value: 14,label: "Fantasy"},
{value: 36,label: "History"},
{value: 27,label: "Horror"},
{value: 10402,label: "Music"},
{value: 9648,label: "Mystery"},
{value: 10749,label: "Romance"},
{value: 878,label: "Science Fiction"},
{value: 10770,label: "TV Movie"},
{value: 53,label: "Thriller"},
{value: 10752,label: "War"},
{value: 37,label: "Western"},
];



function ProductFilter() {
  return (
      <Stack spacing={1} sx={{ p: 3, width: 220 }}>
        <Typography variant="h6" sx={{ fontWeight: 600,p: 3, width: 250 }}>
        GENDER
        </Typography>
        <FRadioGroup
          name="genre"
          options={FILTER_GENDER_OPTIONS.map((item) => item.value)}
          getOptionLabel={FILTER_GENDER_OPTIONS.map((item) => item.label)}
        />
      </Stack>
  );
}

export default ProductFilter;