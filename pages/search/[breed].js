import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
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

  const buttonClickHandler = () => {
    window.location.href = '../';
  };

  return (
    <div class="flex-column w-25 justify-content-center d-flex position-absolute top-50 start-50 translate-middle gap-3">
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
      <Button
      variant="contained"
      color="secondary"
      onClick={buttonClickHandler}>Back to search</Button>
    </div>
  );
};
  

export default DogImageComponent;
