const ODYSEE_VIDEO = {
  id: 'odysee-1',
  title: 'nier',
  thumbnail: 'https://thumbnails.odycdn.com/card/s:1280:720/quality:85/plain/https://thumbs.odycdn.com/2402cf397d252534583f990c4058624b.webp',
  videoUrl: 'https://odysee.com/$/embed/@Alis_FX:f/nier:1?r=4CxXHkDh87AZfbvv4e9MEYzVDTLUyYbM',
  author: 'Alis_FX',
  views: '1.2K views',
  postedAt: '2 years ago',
  duration: '04:20',
  description: 'Video: nier\nCanal: Alis_FX\nVisitas: 1.2K\nFecha: hace 2 años',
  subscriberCount: '500 subscribers'
};

export const MOCK_VIDEOS = Array.from({ length: 12 }, (_, i) => ({
  ...ODYSEE_VIDEO,
  id: `odysee-${i + 1}`,
}));
