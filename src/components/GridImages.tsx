import {
  Box,
  Container,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { CommonResponse } from '../utils/normalizeResponses';

type GridImagesProps = {
  imagesData: CommonResponse | null;
};

const GridImages: React.FC<GridImagesProps> = ({ imagesData }) => {
  if (imagesData === null) {
    return (
      <Typography mt={2} color="info" variant="body2" textAlign="center">
        No photos found. Try searching for a different category.
      </Typography>
    );
  }

  return (
    <Container sx={{ mt: 10 }}>
      <ImageList cols={3} gap={15}>
        {imagesData?.images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image.url}
              alt={image.tags}
              style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
              loading="lazy"
            />
            <ImageListItemBar
              title={
                <Box mb={0.5} display={'flex'} alignContent={'center'} gap={1}>
                  <PersonIcon fontSize={'small'} />
                  <Typography variant="body1">{image.photographer}</Typography>
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
