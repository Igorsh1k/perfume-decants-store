import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const playfair = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-inter',
});

const SITE_URL = 'https://overdoseparfums.com.ua';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'Overdose Parfums | Нішева парфумерія на розпив в Україні',
    template: '%s | Overdose Parfums',
  },
  description:
    'Інтернет-магазин оригінальної нішевої та люксової парфумерії на розпив в Україні. Деканти від 1 мл — Baccarat Rouge 540, Tom Ford Lost Cherry, Creed Aventus, Kilian, Le Labo. Швидка доставка Новою Поштою.',

  keywords: [
    'нішева парфумерія',
    'парфумерія на розпив',
    'деканти',
    'купити парфуми',
    'overdose parfums',
    'baccarat rouge 540',
    'tom ford',
    'creed aventus',
    'kilian',
    'le labo',
    'парфуми україна',
    'нішева парфумерія україна',
    'розпив парфумів',
    'атомайзер',
    'люксова парфумерія',
  ],

  authors: [{ name: 'Overdose Parfums', url: SITE_URL }],
  creator: 'Overdose Parfums',
  publisher: 'Overdose Parfums',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: SITE_URL,
    siteName: 'Overdose Parfums',
    title: 'Overdose Parfums | Нішева парфумерія на розпив в Україні',
    description:
      'Оригінальна нішева та люксова парфумерія на розпив. Деканти від 1 мл. Baccarat Rouge 540, Tom Ford, Creed, Kilian. Доставка Новою Поштою по Україні.',
    images: [
      {
        url: '/images/hero_smoky.jpg',
        width: 1200,
        height: 630,
        alt: 'Overdose Parfums — нішева парфумерія на розпив',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Overdose Parfums | Нішева парфумерія на розпив',
    description: 'Деканти від 1 мл — оригінальна нішева парфумерія. Доставка по Україні.',
    images: ['/images/hero_smoky.jpg'],
  },

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Overdose Parfums',
        url: SITE_URL,
        logo: `${SITE_URL}/images/hero_smoky.jpg`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+380987979790',
          contactType: 'customer service',
          availableLanguage: 'Ukrainian',
        },
        sameAs: [
          'https://instagram.com/overdose_parfum',
          'https://tiktok.com/@overdose_parfum',
          'https://t.me/overdose_parfum',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Overdose Parfums',
        description: 'Нішева парфумерія на розпив в Україні',
        publisher: { '@id': `${SITE_URL}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/catalog?q={search_term_string}` },
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'uk-UA',
      },
      {
        '@type': 'Store',
        '@id': `${SITE_URL}/#store`,
        name: 'Overdose Parfums',
        description: 'Інтернет-магазин нішевої та люксової парфумерії на розпив',
        url: SITE_URL,
        telephone: '+380987979790',
        priceRange: '$$',
        servesCuisine: undefined,
        hasMap: undefined,
        openingHours: 'Mo-Su 09:00-20:00',
        currenciesAccepted: 'UAH',
        paymentAccepted: 'Cash, Card',
        areaServed: 'Ukraine',
      },
    ],
  };

  return (
    <html lang="uk" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0B0C] text-white font-sans selection:bg-[#D4AF37] selection:text-[#0B0B0C] overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
