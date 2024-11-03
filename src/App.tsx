import { Box, Button, CircularProgress, MenuItem, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PixabayApiService from './api/pixabay-service/PixabayApiService';
import PixabayResponse from './api/pixabay-service/PixabayResponse';
import GridImages from './components/GridImages';
import PexelsApiService from './api/pexels-service/PexelsApiService';
import PexelsResponse from './api/pexels-service/PexelsResponse';
import {
  CommonResponse,
  normalizePexelsResponse,
  normalizePixabayResponse,
} from './utils/normalizeResponses';

function App() {
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('Pixbay');
  const [imagesData, setImagesData] = useState<CommonResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (imagesData !== null) {
      setImagesData(null);
    }

    const fetchImagesData = async () => {
      setIsLoading(true);
      const pixabayService = new PixabayApiService();
      const pexelsService = new PexelsApiService();
      try {
        let commonResponse: CommonResponse = { images: [] };
        if (source === 'Pixbay') {
          const pixabayData: PixabayResponse = await pixabayService.getImageByCategory(category);
          commonResponse = normalizePixabayResponse(pixabayData);
        } else if (source === 'Pexels') {
          const pexelsData: PexelsResponse = await pexelsService.getImageByCategory(category);
          commonResponse = normalizePexelsResponse(pexelsData);
        }
        setImagesData(commonResponse);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesData();
  };

  return (
    <>
      <Box component="main" sx={{ maxWidth: 400, mx: 'auto', mt: 30 }}>
        <Typography component="h1" variant="h3" gutterBottom textAlign="center">
          Photo Search
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
          <TextField
            select
            value={source}
            label="Select source"
            fullWidth
            sx={{ mb: 2 }}
            onChange={handleSelect}
          >
            <MenuItem value="Pixbay">Pixbay</MenuItem>
            <MenuItem value="Pexels">Pexels</MenuItem>
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
      {isLoading ? (
        <Box sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', mt: 5 }}>
          <CircularProgress size={50} />
        </Box>
      ) : (
        <GridImages imagesData={imagesData} />
      )}
    </>
  );
}

export default App;
