import PexelsResponse from './PexelsResponse';

class PexelsApiService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = 'https://api.pexels.com/v1';
    this.apiKey = import.meta.env.VITE_PEXELS_API_KEY;
  }

  public async getImageByCategory(category: string | undefined): Promise<PexelsResponse> {
    if (!category) {
      throw new Error('Category is required');
    }

    const url = `${this.baseUrl}/search?query=${category}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error('Fetch error:', err);
      throw err;
    }
  }
}

export default PexelsApiService;
