interface PixabayResponse {
  hits: [
    {
      webformatURL: string;
      tags: string;
      user: string;
    },
  ];
}

export default PixabayResponse;
