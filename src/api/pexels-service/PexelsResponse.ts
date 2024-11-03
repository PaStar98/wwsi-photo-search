interface PexelsResponse {
  photos: [
    {
      src: {
        medium: string;
      };
      photographer: string;
      alt: string;
    },
  ];
}

export default PexelsResponse;
