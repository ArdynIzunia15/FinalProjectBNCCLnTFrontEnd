import { useEffect, useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Router, useRouter } from "next/router";

const DogComponent = () => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(""); // Added selectedBreed state
  const router = useRouter();

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch('https://dog.ceo/api/breeds/list/all');
        const data = await response.json();
        const breedsArray = Object.keys(data.message);
        setBreeds(breedsArray);
        console.log(breedsArray);
      } catch (error){
        console.log(error)
      }
    };

    fetchBreeds();
  }, []);

  const handleBreedChange = (event) => {
    setSelectedBreed(event.target.value);
  };

  const handleButtonClick = (breed) => {
    router.push('/search/' + breed);
  };

  return (
    <div className="container">
      <h1>Dog Image</h1>
      <FormControl fullWidth>
        <InputLabel>Breed</InputLabel>
        <Select
          value={selectedBreed} // Added value prop
          onChange={handleBreedChange} // Added onChange event handler
        >
          {breeds.map((breed, index) => (
            <MenuItem key={index} value={breed}>{breed}</MenuItem> // Added key prop
          ))}
        </Select>
      </FormControl>
      <Button 
      variant="contained" 
      color="secondary" 
      fullWidth
      onClick={() => handleButtonClick(selectedBreed)}>Search</Button>
    </div>
  );
}

function indexPage(){
  const [count, setCount] = useState(0);
  return (
    <div>
      <DogComponent />
    </div>
    
  );
}

export default indexPage;
