import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const TermsOfService = () => {
  return (
    <>
      <Seo
        title="Terms of Service"
        description="Syntheseed Terms of Service — Review the terms and conditions governing your use of our website and services."
        canonical="https://syntheseed.com/terms-of-service"
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

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 12, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="leading-relaxed">
                By accessing or using the Syntheseed website and services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services. We reserve the right to modify these Terms at any time, and your continued use of the Services constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Services</h2>
              <p className="leading-relaxed">
                Syntheseed provides AI-powered innovation and digital transformation services, including but not limited to product engineering, strategic consulting, and technology solutions. The specific features and functionality of our Services may change from time to time at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
              <p className="leading-relaxed mb-4">By using our Services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information when interacting with our Services</li>
                <li>Use the Services only for lawful purposes and in accordance with these Terms</li>
                <li>Not attempt to gain unauthorized access to any part of the Services or related systems</li>
                <li>Not use the Services to transmit any harmful, offensive, or illegal content</li>
                <li>Not interfere with or disrupt the integrity or performance of the Services</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
              <p className="leading-relaxed">
                All content, features, and functionality of our Services — including but not limited to text, graphics, logos, icons, images, audio clips, software, and compilation thereof — are the exclusive property of Syntheseed or its licensors and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Confidentiality</h2>
              <p className="leading-relaxed">
                Any non-public information shared between you and Syntheseed in connection with the Services shall be treated as confidential. Neither party shall disclose confidential information to third parties without the prior written consent of the disclosing party, except as required by law or as necessary to perform obligations under these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="leading-relaxed">
                To the fullest extent permitted by applicable law, Syntheseed shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of (or inability to access or use) the Services. In no event shall our total liability exceed the amount paid by you, if any, for accessing the Services during the twelve (12) months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Disclaimer of Warranties</h2>
              <p className="leading-relaxed">
                The Services are provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement. Syntheseed does not warrant that the Services will be uninterrupted, error-free, or completely secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Indemnification</h2>
              <p className="leading-relaxed">
                You agree to indemnify, defend, and hold harmless Syntheseed, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses arising from your use of the Services or your violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
              <p className="leading-relaxed">
                We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
              <p className="leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Syntheseed is incorporated, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be resolved in the competent courts of that jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Changes to These Terms</h2>
              <p className="leading-relaxed">
                We reserve the right to update or modify these Terms at any time. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review these Terms periodically. Your continued use of the Services after any changes constitutes acceptance of the updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
