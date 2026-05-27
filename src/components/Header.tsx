import { useEffect, useState } from 'react';
import { trackEvent } from '../utils/analytics';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';


const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Product', href: '#product' },
    { label: 'Careers', href: '#careers' },
    { label: 'Blog', href: '#blogs' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Smooth Scroll with Router Support
  const scrollToSection = (href: string) => {
    const id = href.startsWith('#') ? href.slice(1) : href;
    if (id === 'blog') {
      // Special handling for Blog section
      if (location.pathname !== '/') {
        // Navigate to home first
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 700);
      } else {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          el?.scrollIntoView({ behavior: 'smooth' });
        }, 700);
      }
    }
    setIsMobileMenuOpen(false);
  };

  // smart navigation (works from any page)
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      // if already on homepage
      if (location.pathname === "/") {
        scrollToSection(href);
      } else {
        // navigate home and scroll after load
        navigate("/");
        setTimeout(() => scrollToSection(href), 400);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-3 left-0 right-0 z-50">
      <div className="px-3 sm:px-4">
        <div
          className={`mx-auto max-w-7xl rounded-xl transition-all duration-300 ${isScrolled
            ? 'glass-header-scrolled py-3'
            : 'glass-header py-5'
            } px-4 sm:px-6`}
        >
          <div className="flex items-center justify-between w-full gap-3">
            {/* Logo */}
            <div className="flex items-center space-x-2 min-w-0">
              <img src={theme === 'dark' ? '/logo-light.png' : '/logo-light.png'} alt="Syntheseed Logo" className="w-10 h-10 object-contain" />
              <span
                className="text-xl font-bold truncate text-[rgb(var(--header-text))]"
              >
                Syntheseed
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7 md:ml-12">
              {navItems.map((item) => (
                <button
                  key={item.href}
                onClick={() => { trackEvent('nav_click', { button: item.label, location: 'header_desktop' }); scrollToSection(item.href); }}
                  className="text-[rgb(var(--header-text))] hover:text-cyan-400 transition font-medium px-1 py-1 opacity-90 hover:opacity-100"
                  tabIndex={0}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => { trackEvent('cta_click', { button: 'Login/Register', location: 'header_desktop' }); window.open('https://app.syntheseed.com', '_blank'); }}
                className="hidden md:inline-block btn-primary"
                style={{ minWidth: 108, textAlign: 'center' }}
              >
                Login/Register
              </button>

              {/* Theme Switch */}
              <button
                onClick={() => { trackEvent('theme_toggle', { theme: theme === 'light' ? 'dark' : 'light' }); toggleTheme(); }}
                className="p-2 rounded-lg bg-white/10 hover:bg-cyan-500/20 transition"
                aria-label="Toggle theme"
                tabIndex={0}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-[rgb(var(--header-text))]" />
                ) : (
                  <Sun className="w-5 h-5 text-[rgb(var(--header-text))]" />
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-cyan-500/20 transition"
                aria-label="Toggle menu"
                tabIndex={0}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-[rgb(var(--header-text))]" />
                ) : (
                  <Menu className="w-6 h-6 text-[rgb(var(--header-text))]" />
                )}
              </button>
            </div>
          </div>
        </div>


        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-3 glass-header rounded-xl p-4 animate-fade-in flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => { trackEvent('nav_click', { button: item.label, location: 'header_mobile' }); handleNavClick(item.href); }}
                className="w-full text-left py-3 px-4 text-[rgb(var(--header-text))] hover:text-cyan-400 hover:bg-white/10 rounded-lg font-medium transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => {
                  trackEvent('cta_click', { button: 'Login/Register', location: 'header_mobile' });
                  window.open('https://app.syntheseed.com', '_blank');
                  setIsMobileMenuOpen(false);
                }}
                className="flex-1 btn-primary text-center justify-center"
              >
                Login/Register
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
