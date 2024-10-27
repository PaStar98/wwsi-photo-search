import PixabayResponse from './PixabayResponse';

class PixabayApiService {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = 'https://pixabay.com/api';
    this.apiKey = import.meta.env.VITE_PIXABAY_API_KEY;
  }

  private getUrl(queryParams: Record<string, string> = {}): string {
    const query = new URLSearchParams(queryParams).toString();
    console.log(query);
    console.log(`${this.baseUrl}/?key=${this.apiKey}&${query}}`);
    return `${this.baseUrl}/?key=${this.apiKey}&${query}=${this.apiKey}`;
  }

  public async getImageByCategory(category: string | undefined): Promise<PixabayResponse> {
    if (!category) {
      throw new Error('Category is required');
    }

    const url = this.getUrl({ q: category });

    try {
      const response = await fetch(url);

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

export default PixabayApiService;
