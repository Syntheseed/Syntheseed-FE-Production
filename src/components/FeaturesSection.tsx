// import { useScrollAnimation } from '../hooks/useScrollAnimation';
// import { Lightbulb, Target, TrendingUp, DollarSign, Rocket, Users } from 'lucide-react';

// const FeaturesSection = () => {
//   const { ref, isVisible } = useScrollAnimation();

//   const features = [
//     {
//       title: 'Capture Ideas',
//       description: 'Never lose a brilliant thought. Capture and organize every spark of inspiration instantly.',
//       icon: Lightbulb,
//       color: 'from-cyan-400 to-cyan-600'
//     },
//     {
//       title: 'Validate with AI',
//       description: 'Get instant AI-powered validation on feasibility, market potential, and execution strategy.',
//       icon: Target,
//       color: 'from-blue-400 to-blue-600'
//     },
//     {
//       title: 'Compare Concepts',
//       description: 'Side-by-side comparison of multiple ideas to identify the strongest opportunities.',
//       icon: TrendingUp,
//       color: 'from-teal-400 to-teal-600'
//     },
//     {
//       title: 'Align Pricing',
//       description: 'Smart pricing recommendations based on market analysis and competitive landscape.',
//       icon: DollarSign,
//       color: 'from-emerald-400 to-emerald-600'
//     },
//     {
//       title: 'GTM Strategy',
//       description: 'Comprehensive go-to-market plans tailored to your product and target audience.',
//       icon: Rocket,
//       color: 'from-sky-400 to-sky-600'
//     },
//     {
//       title: 'Team Collaboration',
//       description: 'Work seamlessly with your team, share insights, and iterate faster together.',
//       icon: Users,
//       color: 'from-cyan-500 to-blue-500'
//     }
//   ];

//   return (
//     <section className="py-12 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent">
//       <div className="container mx-auto px-6">
//         <div
//           ref={ref}
//           className={`max-w-7xl mx-auto transition-all duration-1000 ${
//             isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//           }`}
//         >
//           <div className="text-center mb-16">
//             <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
//               AI-Driven <span className="text-gradient">Features</span>
//             </h2>
//             <p className="text-xl text-secondary max-w-3xl mx-auto mb-4">
//               Everything you need to go from spark to strategy
//             </p>
//             <p className="text-lg text-secondary max-w-2xl mx-auto">
//               Capture ideas, validate with AI, compare concepts, and align pricing and GTM — all in one place.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={index}
//                   className={`glass-effect p-8 rounded-2xl hover:scale-105 hover:shadow-2xl transition-all duration-500 group transform-3d ${
//                     isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
//                   }`}
//                   style={{
//                     transitionDelay: `${index * 100}ms`,
//                     transform: 'translateZ(0)'
//                   }}
//                 >
//                   <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 animate-pulse-glow`}>
//                     <Icon className="w-8 h-8 text-white" />
//                   </div>

//                   <h3 className="text-xl font-bold text-primary mb-4">
//                     {feature.title}
//                   </h3>

//                   <p className="text-secondary leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturesSection;
const FeaturesSection = () => {
  return <div />;
};

export default FeaturesSection;
