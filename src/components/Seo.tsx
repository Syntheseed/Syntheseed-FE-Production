import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
  };
  jsonLd?: Record<string, any> | null;
}

const DEFAULT_TITLE = 'Syntheseed';
const DEFAULT_DESC = 'Transform Abstract Thoughts into Reality with the Power of Artificial Intelligence, Human Intelligence, and Digital Intelligence';

export default function Seo({ title, description, canonical, openGraph, jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    document.title = fullTitle;

    const desc = description || DEFAULT_DESC;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // canonical link
    if (canonical) {
      let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // Open Graph
    if (openGraph) {
      const og = openGraph;
      const setOg = (property: string, value?: string) => {
        if (!value) return;
        let tag = document.querySelector(`meta[property='${property}']`) as HTMLMetaElement | null;
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', value);
      };
      setOg('og:title', og.title || fullTitle);
      setOg('og:description', og.description || desc);
      if (og.image) setOg('og:image', og.image);
      if (og.url) setOg('og:url', og.url);
    }

    // JSON-LD structured data
    if (jsonLd) {
      let script = document.querySelector("script[type='application/ld+json']") as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.text = JSON.stringify(jsonLd);
    }

    // cleanup function is intentionally a no-op because we want these tags to persist across navigations,
    // but you can implement removal logic if you prefer a per-page-only approach.
  }, [title, description, canonical, openGraph, jsonLd]);

  return null;
}
