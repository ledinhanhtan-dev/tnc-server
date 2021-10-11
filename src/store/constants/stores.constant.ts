const STORES = [
  {
    slug: 'msi-official-store',
    featuredProducts: [
      {
        image: 'http://localhost:3000/image/banner/store-msi-featured-1.jpg',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-msi-featured-2.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-msi-featured-3.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-msi-featured-4.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-msi-featured-5.png',
        slug: '',
      },
    ],
  },
  {
    slug: 'asus-official-store',
    featuredProducts: [
      {
        image: 'http://localhost:3000/image/banner/store-asus-featured-1.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-asus-featured-2.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-asus-featured-3.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-asus-featured-4.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-asus-featured-5.png',
        slug: '',
      },
    ],
  },
  {
    slug: 'lg-official-store',
    featuredProducts: [
      {
        image: 'http://localhost:3000/image/banner/store-lg-featured-1.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-lg-featured-2.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-lg-featured-3.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-lg-featured-4.png',
        slug: '',
      },
      {
        image: 'http://localhost:3000/image/banner/store-lg-featured-5.png',
        slug: '',
      },
    ],
  },
  {
    slug: 'acer-official-store',
    featuredProducts: [],
  },
  {
    slug: 'nzxt-official-store',
    featuredProducts: [],
  },
];

export const getFeaturedProducts = (slug: string) => {
  return STORES.find(store => store.slug === slug).featuredProducts;
};
