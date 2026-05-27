import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Seo from '../components/Seo';

const SecurityPolicy = () => {
  return (
    <>
      <Seo
        title="Security"
        description="Syntheseed Security — Learn about our commitment to protecting your data and maintaining the highest security standards."
        canonical="https://syntheseed.com/security"
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

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Security</h1>
          <p className="text-muted-foreground mb-12">Last updated: March 12, 2026</p>

          <div className="prose prose-lg max-w-none space-y-8 text-foreground/90">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Our Commitment to Security</h2>
              <p className="leading-relaxed">
                At Syntheseed, security is foundational to everything we build. We are committed to protecting the confidentiality, integrity, and availability of our systems, data, and the information entrusted to us by our clients and users. We continuously invest in security practices, technologies, and training to safeguard against evolving threats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Infrastructure Security</h2>
              <p className="leading-relaxed mb-4">Our infrastructure is designed with security at its core:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Cloud Hosting:</strong> Our services are hosted on industry-leading cloud platforms that maintain rigorous security certifications including SOC 2, ISO 27001, and more.</li>
                <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers is encrypted using TLS 1.2 or higher.</li>
                <li><strong>Encryption at Rest:</strong> Sensitive data stored in our systems is encrypted at rest using AES-256 encryption.</li>
                <li><strong>Network Security:</strong> We employ firewalls, intrusion detection systems, and network segmentation to protect our infrastructure.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Application Security</h2>
              <p className="leading-relaxed mb-4">We follow secure development practices throughout our software development lifecycle:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Secure Development:</strong> Our engineering team follows OWASP guidelines and secure coding best practices.</li>
                <li><strong>Code Reviews:</strong> All code changes undergo peer review with a focus on security considerations.</li>
                <li><strong>Dependency Management:</strong> We regularly audit and update third-party dependencies to address known vulnerabilities.</li>
                <li><strong>Testing:</strong> We conduct regular security testing, including automated vulnerability scanning and manual penetration testing.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Protection</h2>
              <p className="leading-relaxed mb-4">We take a comprehensive approach to protecting your data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Access Controls:</strong> We implement role-based access controls and the principle of least privilege to limit data access to authorized personnel only.</li>
                <li><strong>Data Minimization:</strong> We only collect and retain data that is necessary for providing our services.</li>
                <li><strong>Backup &amp; Recovery:</strong> We maintain regular backups with tested recovery procedures to ensure data availability and resilience.</li>
                <li><strong>Data Retention:</strong> We have clear data retention policies and securely delete data when it is no longer needed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Organizational Security</h2>
              <p className="leading-relaxed mb-4">Security is embedded in our organizational culture:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Security Training:</strong> All employees receive regular security awareness training.</li>
                <li><strong>Background Checks:</strong> We conduct background checks on employees who have access to sensitive systems and data.</li>
                <li><strong>Incident Response:</strong> We maintain a documented incident response plan that is regularly tested and updated.</li>
                <li><strong>Vendor Management:</strong> We assess the security posture of third-party vendors before engagement and on an ongoing basis.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Monitoring &amp; Incident Response</h2>
              <p className="leading-relaxed">
                We continuously monitor our systems for suspicious activity and potential security threats. Our incident response team is prepared to quickly identify, contain, and remediate security incidents. In the event of a data breach that affects your personal information, we will notify you in accordance with applicable laws and regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Compliance</h2>
              <p className="leading-relaxed">
                We are committed to complying with applicable data protection laws and regulations, including GDPR, CCPA, and other relevant privacy frameworks. We regularly review and update our practices to maintain compliance as regulations evolve.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Responsible Disclosure</h2>
              <p className="leading-relaxed">
                We value the security research community and welcome responsible disclosure of any vulnerabilities found in our systems. If you discover a security vulnerability, please report it to us at{' '}
                <a href="mailto:security@syntheseed.com" className="text-primary hover:underline">
                  security@syntheseed.com
                </a>
                . We commit to acknowledging your report promptly and working with you to understand and address the issue.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about our security practices, please contact us at:
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

export default SecurityPolicy;
