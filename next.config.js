/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Désactiver les polyfills pour réduire le bundle
  webpack: (config, { dev, isServer }) => {
    // Désactiver TOUS les polyfills Node.js et Web APIs
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        buffer: false,
        util: false,
        assert: false,
        http: false,
        https: false,
        os: false,
        url: false,
        zlib: false,
        process: false
      }
    }

    // Optimisations agressives pour la production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        // Éliminer le code mort plus agressivement
        usedExports: true,
        sideEffects: false,
      }

      // Éliminer les polyfills de core-js et regenerator
      config.resolve.alias = {
        ...config.resolve.alias,
        'core-js': false,
        'regenerator-runtime': false,
      }
    }

    return config
  },

  // SWC minification est activé par défaut dans Next.js 15

  // Optimisations CSS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },


  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Compression
  compress: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    domains: [
      'upload.wikimedia.org',
      'assets.vercel.com',
      'supabase.com',
      'cdn.jsdelivr.net'
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Redirects pour les anciennes URLs en 404
  async redirects() {
    return [
      // Redirections canoniques - HTTP vers HTTPS
      {
        source: '/:path*',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http',
          },
        ],
        destination: 'https://www.digitalqt.com/:path*',
        permanent: true,
      },
      // Redirection sans www vers avec www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'digitalqt.com',
          },
        ],
        destination: 'https://www.digitalqt.com/:path*',
        permanent: true,
      },
      {
        source: '/about-us.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/mentions-legales.html',
        destination: '/mentions-legales',
        permanent: true,
      },
      // Redirections pour l'ancien site WordPress
      {
        source: '/wp-content/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/wp-includes/:path*',
        destination: '/',
        permanent: true,
      },
      // Redirections spécifiques pour les PDFs de l'ancien site acfit
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.acfit.digitalqt.com',
          },
        ],
        destination: 'https://www.digitalqt.com/',
        permanent: true,
      },
    ]
  },

  // Headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://checkout.stripe.com https://connect-js.stripe.com https://cdn.jsdelivr.net; connect-src 'self' https://api.stripe.com https://checkout.stripe.com https://js.stripe.com https://connect-js.stripe.com https://mnsmxqfmossvnlprmnjr.supabase.co wss://mnsmxqfmossvnlprmnjr.supabase.co; frame-src 'self' https://js.stripe.com https://checkout.stripe.com https://connect-js.stripe.com; img-src 'self' data: https: blob:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self' https://checkout.stripe.com;",
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Bundle analyzer (uncomment for analysis)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.alias['@'] = path.join(__dirname, 'src')
  //   }
  //   return config
  // },
}

module.exports = nextConfig