import PexelsResponse from '../api/pexels-service/PexelsResponse';
import PixabayResponse from '../api/pixabay-service/PixabayResponse';

interface ImageData {
  url: string;
  tags: string;
  photographer: string;
}

export interface CommonResponse {
  images: ImageData[];
}

export function normalizePixabayResponse(response: PixabayResponse): CommonResponse {
  return {
    images: response.hits.map(hit => ({
      url: hit.webformatURL,
      tags: hit.tags,
      photographer: hit.user,
    })),
  };
}

export function normalizePexelsResponse(response: PexelsResponse): CommonResponse {
  return {
    images: response.photos.map(photo => ({
      url: photo.src.medium,
      tags: photo.alt,
      photographer: photo.photographer,
    })),
  };
}
