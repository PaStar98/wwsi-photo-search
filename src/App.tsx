import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PixabayApiService from './api/pixabay-service/PixabayApiService';
import PixabayResponse from './api/pixabay-service/PixabayResponse';
import GridImages from './components/GridImages';

function App() {
  const [category, setCategory] = useState('');
  const [pixabayData, setPixabayData] = useState<PixabayResponse | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (pixabayData !== null) {
      setPixabayData(null);
    }

    const fetchWeatherImage = async () => {
      const pixabayService = new PixabayApiService();
      const pixabayData: PixabayResponse = await pixabayService.getImageByCategory(category);
      console.log(`category: ${category}`);
      setPixabayData(pixabayData);
    };

    fetchWeatherImage();
  };

  return (
    <>
      <Box component="main" sx={{ maxWidth: 400, mx: 'auto', mt: 30 }}>
        <Typography component="h1" variant="h3" gutterBottom textAlign="center">
          Photo Search
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField select label="Select source" fullWidth sx={{ mb: 2 }}>
            <MenuItem value="Pexels">Pexels</MenuItem>
            <MenuItem value="Pixbay">Pixbay</MenuItem>
          </TextField>
          <TextField
            sx={{ mb: 2 }}
            value={category}
            label="Type a category"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<span className="material-icons">search</span>}
          ></Button>
        </Box>
      </Box>
      <GridImages pixabayData={pixabayData} />
    </>
  );
}

export default App;
