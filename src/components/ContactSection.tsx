import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useSubmitContactMutation } from '../services/contactApi';
import toast from 'react-hot-toast';
import analytics, { trackEvent } from '../utils/analytics';
import { useTheme } from '../contexts/ThemeContext';

const contacts = [
  {
    icon: Mail,
    title: 'General Information',
    email: 'info@syntheseed.com',
  },
  {
    icon: Mail,
    title: 'Support',
    email: 'help@syntheseed.com',
  },
  {
    icon: Mail,
    title: 'Careers',
    email: 'career@syntheseed.com',
  },
  {
    icon: Mail,
    title: 'Investment',
    email: 'invest@syntheseed.com',
  },
];

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitContact, { isLoading }] = useSubmitContactMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await submitContact(formData).unwrap();
      toast.success('Message sent successfully!');
      // Analytics: track contact form success
      analytics.trackFormSubmission('contact_form', true, { page: window.location.pathname });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const message = (err as { data?: { message?: string } })?.data?.message;
      // Analytics: track contact form failure
      analytics.trackFormSubmission('contact_form', false, { page: window.location.pathname });
      toast.error(message || 'Failed to send message!');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section id="contact" className="py-12 relative bg-[rgb(var(--bg-primary))]">
      <div className="container mx-auto px-6">
        <div
          ref={ref}
          className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
        >
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest text-[rgb(var(--synth-blue))] mb-1">CONTACT</p>
            <h2 className="text-3xl md:text-3xl font-extrabold mb-4 text-[rgb(var(--synth-blue))]">
              <span className="text-gradient">
                Get In Touch
              </span>
            </h2>
            <p className="text-lg md:text-xl text-[rgb(var(--text-secondary))] max-w-2xl mx-auto">
              Ready to transform your ideas into reality? Let's start a conversation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Information Card */}
            <div className="glass-effect rounded-2xl shadow-lg p-8 flex flex-col justify-center min-h-[370px]">
              <h3 className="text-2xl font-bold mb-7 text-[rgb(var(--text-primary))]">Contact Us</h3>
              <div className="space-y-6">
                {contacts.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 transition-all">
                    <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-[rgb(var(--synth-blue))] shadow">
                      <item.icon className="w-6 h-6 text-white" />
                    </span>
                    <div>
                      <h4 className="text-base font-bold mb-0.5 text-[rgb(var(--text-primary))]">{item.title}</h4>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-[rgb(var(--synth-blue))] hover:text-[rgb(var(--synth-blue-inactive))] text-sm transition"
                        tabIndex={0}
                      >
                        {item.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Card */}
            <div className="glass-effect rounded-2xl shadow-lg p-8 flex flex-col justify-center">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[rgb(var(--synth-blue))] font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[rgb(var(--synth-blue))] font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-[rgb(var(--synth-blue))] font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    className="input-field w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-[rgb(var(--synth-blue))] font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your project or inquiry..."
                    rows={5}
                    className="input-field w-full resize-none"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  onClick={() => trackEvent('button_click', { button: 'Send Message', location: 'contact_section' })}
                  className={`btn-primary w-full flex items-center justify-center gap-2 py-3 text-lg font-semibold rounded-xl transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  <Send className="w-5 h-5" />
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
