import { Linkedin, Instagram, Mail, Twitter } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { trackEvent } from '../utils/analytics';

const Footer = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  // Footer navigation categories with links
  const footerNav = {
    Company: [
      { label: 'Home', href: '#home' },
      { label: 'About', href: '#about' },
      { label: 'How it Works', href: '#process' },

    ],
    Services: [
      { label: 'Product', href: '#product' },
      { label: 'Careers', href: '#careers' },
    ],
    Resources: [
      { label: 'Blog', href: '#blogs' },
      { label: 'Contact', href: '#contact' },
    ],
    Legal: [
      { label: 'Privacy Policy', href: '/privacy-policy', isRoute: true },
      { label: 'Terms of Service', href: '/terms-of-service', isRoute: true },
      { label: 'Cookie Policy', href: '/cookie-policy', isRoute: true },
      { label: 'Security', href: '/security', isRoute: true },
    ],
  };

  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Navigate to homepage first, then scroll to section
      navigate('/');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  };

  return (
    <footer className="bg-[rgb(var(--header-bg))] pt-20 pb-8">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={theme === 'dark' ? '/logo-light.png' : '/logo-light.png'} alt="Syntheseed Logo" className="w-10 h-10 object-contain" />
              <span className="text-xl font-bold text-[rgb(var(--header-text))]">Syntheseed</span>
            </div>
            <p className="text-[rgb(var(--header-text))]/70 mb-6 leading-relaxed">
              Empowering businesses with innovative technology solutions that drive growth and transformation.
            </p>
            <div className="flex space-x-4">
              {[
                {
                  Icon: Linkedin,
                  url: "https://www.linkedin.com/company/syntheseed/",
                  label: "LinkedIn"
                },
                {
                  Icon: Instagram,
                  url: "https://www.instagram.com/syntheseed1/",
                  label: "Instagram"
                },
                {
                  Icon: Mail,
                  url: "mailto:info@syntheseed.com",
                  label: "Email"
                },
                {
                  Icon: Twitter,
                  url: "https://x.com/Syntheseed",
                  label: "Twitter"
                }
              ].map(({ Icon, url, label }, i) => (
              <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('social_click', { platform: label, location: 'footer' })}
                  className="w-10 h-10 rounded-lg bg-[rgb(var(--header-text))]/10 hover:bg-cyan-500/20 transition-all duration-300 flex items-center justify-center"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-[rgb(var(--header-text))]/70 hover:text-cyan-500" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links - now 4 columns */}
          {Object.entries(footerNav).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-[rgb(var(--header-text))] font-bold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map(({ label, href, isRoute }: any) => (
                  <li key={label}>
                    <button
                      onClick={() => { trackEvent('nav_click', { button: label, location: 'footer' }); isRoute ? navigate(href) : scrollToSection(href); }}
                      className="text-[rgb(var(--header-text))]/70 hover:text-cyan-500 transition-colors duration-300"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgb(var(--header-text))]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[rgb(var(--header-text))]/70 text-sm">
              {currentYear} Syntheseed. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {[
                { label: 'Privacy', href: '/privacy-policy', isRoute: true },
                { label: 'Terms', href: '/terms-of-service', isRoute: true },
                { label: 'Sitemap', href: '/sitemap.xml', isExternal: true },
              ].map(({ label, href, isRoute, isExternal }: any) => (
                isExternal ? (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[rgb(var(--header-text))]/70 hover:text-cyan-500 text-sm transition-colors duration-300"
                  >
                    {label}
                  </a>
                ) : (
                  <button
                    key={label}
                    onClick={() => { trackEvent('nav_click', { button: label, location: 'footer_bottom' }); isRoute ? navigate(href) : scrollToSection(href); }}
                    className="text-[rgb(var(--header-text))]/70 hover:text-cyan-500 text-sm transition-colors duration-300"
                  >
                    {label}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
