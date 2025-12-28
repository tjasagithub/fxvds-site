
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lmhnfvimfkytxnocjkgk.supabase.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
  env: {
    NEXT_PUBLIC_GEMINI_API_KEY_SET: !!process.env.GEMINI_API_KEY ? 'true' : 'false',
  }
};

export default nextConfig;

async function createRedirects() {
  return [
    {
      source: '/',
      destination: '/en',
      permanent: true,
    },
    {
      source: '/plans-pricing',
      destination: '/en#pricing',
      permanent: true,
    },
    {
      source: '/en/plans-pricing',
      destination: '/en#pricing',
      permanent: true,
    },
    {
      source: '/de/plans-pricing',
      destination: '/de#pricing',
      permanent: true,
    },
    {
      source: '/impressum',
      destination: '/de/legal#impressum',
      permanent: true,
    },
    {
      source: '/de/impressum',
      destination: '/de/legal#impressum',
      permanent: true,
    },
    {
      source: '/en/impressum',
      destination: '/en/legal#impressum',
      permanent: true,
    },
  ];
}

nextConfig.redirects = createRedirects;
