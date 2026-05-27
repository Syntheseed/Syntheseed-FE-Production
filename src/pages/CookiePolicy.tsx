import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const CookiePolicy = () => {
  return (
    <>
      <Seo
        title="Cookie Policy"
        description="Syntheseed Cookie Policy — Learn how we use cookies and similar technologies on our website."
        canonical="https://syntheseed.com/cookie-policy"
      />
      <Header />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 12, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. What Are Cookies</h2>
              <p className="leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to site owners. Cookies can be "persistent" or "session" cookies — persistent cookies remain on your device after you close your browser, while session cookies are deleted when you close your browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Cookies</h2>
              <p className="leading-relaxed mb-4">Syntheseed uses cookies for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas of the website.</li>
                <li><strong>Analytics Cookies:</strong> We use analytics cookies to understand how visitors interact with our website, helping us improve site performance and user experience.</li>
                <li><strong>Functional Cookies:</strong> These cookies allow the website to remember choices you make (such as your preferred language or theme) and provide enhanced, personalized features.</li>
                <li><strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Types of Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-foreground/20 mt-4">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border border-foreground/20 px-4 py-3 text-left text-foreground font-semibold">Cookie Type</th>
                      <th className="border border-foreground/20 px-4 py-3 text-left text-foreground font-semibold">Purpose</th>
                      <th className="border border-foreground/20 px-4 py-3 text-left text-foreground font-semibold">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-foreground/20 px-4 py-3">Essential</td>
                      <td className="border border-foreground/20 px-4 py-3">Required for basic site functionality</td>
                      <td className="border border-foreground/20 px-4 py-3">Session</td>
                    </tr>
                    <tr>
                      <td className="border border-foreground/20 px-4 py-3">Analytics</td>
                      <td className="border border-foreground/20 px-4 py-3">Track site usage and performance</td>
                      <td className="border border-foreground/20 px-4 py-3">Up to 2 years</td>
                    </tr>
                    <tr>
                      <td className="border border-foreground/20 px-4 py-3">Functional</td>
                      <td className="border border-foreground/20 px-4 py-3">Remember user preferences</td>
                      <td className="border border-foreground/20 px-4 py-3">Up to 1 year</td>
                    </tr>
                    <tr>
                      <td className="border border-foreground/20 px-4 py-3">Marketing</td>
                      <td className="border border-foreground/20 px-4 py-3">Deliver relevant advertisements</td>
                      <td className="border border-foreground/20 px-4 py-3">Up to 1 year</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Third-Party Cookies</h2>
              <p className="leading-relaxed">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website and deliver advertisements on and through the website. These third parties may include analytics providers such as Google Analytics and advertising networks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Managing Cookies</h2>
              <p className="leading-relaxed mb-4">
                You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Browser Settings:</strong> Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or delete certain cookies.</li>
                <li><strong>Cookie Consent Tool:</strong> When you first visit our website, you may be presented with a cookie consent banner that allows you to accept or reject non-essential cookies.</li>
                <li><strong>Opt-Out Links:</strong> Some third-party services provide opt-out mechanisms. For example, you can opt out of Google Analytics by installing the Google Analytics opt-out browser add-on.</li>
              </ul>
              <p className="leading-relaxed mt-4">
                Please note that disabling certain cookies may affect the functionality of our website and your user experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Changes to This Cookie Policy</h2>
              <p className="leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about our use of cookies, please contact us at:
              </p>
              <p className="leading-relaxed mt-2">
                <strong>Email:</strong>{' '}
                <a href="mailto:info@syntheseed.com" className="text-primary hover:underline">
                  info@syntheseed.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CookiePolicy;
