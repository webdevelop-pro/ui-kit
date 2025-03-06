import { PageData } from 'vitepress';

export function generateJsonLd(pageData: PageData, env: any): string | null {
  const baseUrl = `${env.FRONTEND_URL}/${pageData.relativePath?.replace(/index\.md$/, '')?.replace(/\.md$/, '.html')}`;
  const keywords = pageData.frontmatter.keywords || pageData.frontmatter.tags || env.keywords;

  const commonData = {
    '@context': 'https://schema.org',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': baseUrl,
    },
    name: pageData.title,
    url: baseUrl,
    description: pageData.description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    inLanguage: 'en-us',
    telephone: env.phone,
    email: env.email,
    sameAs: [
      'https://www.linkedin.com/company/webdevelop-pro',
      'https://www.facebook.com/WebdevelopPro',
      'https://www.instagram.com/webdevelop.pro',
      'https://github.com/webdevelop-pro',
    ],
  };

  if (pageData.frontmatter.jsonLDType) {
    return JSON.stringify({
      ...commonData,
      '@type': pageData.frontmatter.jsonLDType,
      provider: {
        '@type': 'Organization',
        '@id': env.FRONTEND_URL,
        name: env.title,
        logo: {
          '@type': 'ImageObject',
          '@id': `${env.FRONTEND_URL}/public/images/logo.svg`,
          url: `${env.FRONTEND_URL}/public/images/logo.svg`,
          width: '112',
          height: '38',
        },
      },
    });
  }

  return null;
}
