import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface TestimonialSliderProps {
  testimonials: Testimonial[];
  autoPlay?: boolean;
  interval?: number;
}

const TestimonialSlider = ({ testimonials, autoPlay = true, interval = 5000 }: TestimonialSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      goToNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, interval]);

  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className={`backdrop-blur-xl rounded-2xl p-8 md:p-12 relative overflow-hidden border transition-colors duration-300 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/60 border-[rgb(var(--border-subtle))] shadow-xl'}`}>
        <Quote className={`absolute top-6 left-6 w-16 h-16 ${isDark ? 'text-white/20' : 'text-[rgb(var(--synth-blue))] opacity-20'}`} />

        <div className="relative z-10 min-h-[200px] flex flex-col justify-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${index === currentIndex
                  ? 'opacity-100 translate-x-0'
                  : index < currentIndex
                    ? 'opacity-0 -translate-x-full absolute'
                    : 'opacity-0 translate-x-full absolute'
                }`}
            >
              <p className={`text-xl md:text-2xl mb-6 italic leading-relaxed ${isDark ? 'text-white' : 'text-[rgb(var(--text-primary))]'}`}>
                "{testimonial.quote}"
              </p>
              <div className="flex items-center justify-between">
                {testimonial.author && (
                  <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-[rgb(var(--text-primary))]'}`}>{testimonial.author}</p>
                )}
                {testimonial.role && (
                  <p className={`text-sm ${isDark ? 'text-cyan-300' : 'text-[rgb(var(--synth-blue))]'}`}>- {testimonial.role}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goToPrevious}
            className={`w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${isDark ? 'bg-white/20 border-white/30 hover:bg-white/30' : 'bg-white/80 border-[rgb(var(--border-subtle))] hover:bg-white shadow-sm'}`}
            disabled={isAnimating}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[rgb(var(--text-primary))]'}`} />
          </button>

          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(index);
                    setTimeout(() => setIsAnimating(false), 500);
                  }
                }}
                className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? `${isDark ? 'bg-cyan-500' : 'bg-[rgb(var(--synth-blue))]'} w-8`
                    : `${isDark ? 'bg-secondary/30' : 'bg-[rgb(var(--border-strong))]'} w-2 hover:bg-secondary/50`
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className={`w-10 h-10 rounded-full backdrop-blur-xl border flex items-center justify-center transition-all duration-300 disabled:opacity-50 ${isDark ? 'bg-white/20 border-white/30 hover:bg-white/30' : 'bg-white/80 border-[rgb(var(--border-subtle))] hover:bg-white shadow-sm'}`}
            disabled={isAnimating}
            aria-label="Next testimonial"
          >
            <ChevronRight className={`w-5 h-5 ${isDark ? 'text-white' : 'text-[rgb(var(--text-primary))]'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
