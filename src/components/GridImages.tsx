import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PixabayResponse from '../api/pixabay-service/PixabayResponse';
import { useEffect } from 'react';

type GridImagesProps = {
  pixabayData: PixabayResponse | null;
};

const GridImages: React.FC<GridImagesProps> = ({ pixabayData }) => {
  useEffect(() => {
    console.log(pixabayData);
  }, [pixabayData]);

  if (pixabayData === null) {
    return (
      <Typography mt={2} color="error" variant="body2" textAlign="center">
        No photos found. Try searching for a different category.
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <ImageList cols={3} gap={15}>
        {pixabayData?.hits.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image.webformatURL}
              alt={image.tags}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              loading="lazy"
            />
            <ImageListItemBar
              title={
                <Box mb={0.5} display={'flex'} alignContent={'center'} gap={1}>
                  <PersonIcon fontSize={'small'} />
                  <span>{image.user}</span>
                </Box>
              }
              subtitle={image.tags}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Container>
  );
};

export default GridImages;
