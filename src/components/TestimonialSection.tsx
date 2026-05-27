import TestimonialSlider from './TestimonialSlider';

const TestimonialSection = () => (
  <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
    <TestimonialSlider
      testimonials={[
        {
          quote: "Syntheseed helped us transform our innovation process. The AI-powered tools made it easy to turn ideas into actionable plans.",
          author: "Tech Startup",
          role: "Fortune 500 Company"
        },
        {
          quote: "The platform accelerated our product development cycle by 300%. Every team member can now contribute innovative ideas effectively.",
          author: "Product Team",
          role: "Global Enterprise"
        },
        {
          quote: "An incredible tool that bridges the gap between creative thinking and strategic execution. Our innovation output has tripled.",
          author: "Innovation Lab",
          role: "Research Institute"
        }
      ]}
      autoPlay={true}
      interval={6000}
    />
  </div>
);

export default TestimonialSection;
