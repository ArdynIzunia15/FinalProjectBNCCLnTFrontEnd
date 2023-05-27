import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect, Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const DogImageComponent = () => {
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const { breed } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (breed) {
          const apiUrl = `https://dog.ceo/api/breed/${breed}/images/random`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          const url = data.message;
          setImageUrl(url);
          console.log(url);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [breed]);

  return (
    <div class="flex-column w-25 justify-content-center d-flex position-absolute top-50 start-50 translate-middle">
      <Card class="card">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" class=" text-center">
            {breed}
          </Typography>
        </CardContent>
        {imageUrl && (
          <div className="card-media-container">
            <CardMedia
              sx={{ height: 0, paddingTop: "100%" }}
              image={imageUrl}
              title={breed}
            />
          </div>
        )}
      </Card>
    </div>
  );
};
  

export default DogImageComponent;
