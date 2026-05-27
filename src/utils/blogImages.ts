import strategyMeetsDisruption from '../../assets/StrategyMeetsDisruption.jpeg';
import promisesnchalOfAGI from '../../assets/promisesnchalOfAGI.jpeg';
import fromAbstractToConcrete from '../../assets/fromAbstractToConcrete.jpeg';
import unlockingPotWithin from '../../assets/unlockingPotWithin.jpeg';
import aiSamArticle from '../../assets/AISamArcticle.jpg';

const BLOG_IMAGES: Record<string, string> = {
  'when-strategy-meets-disruption-key-lessons-from-th': strategyMeetsDisruption,
  'the-promise-and-challenges-of-artificial-general-i': promisesnchalOfAGI,
  'from-abstract-to-concrete': fromAbstractToConcrete,
  'Unlocking_the_Potential_Within': unlockingPotWithin,
  'the-science-and-art-of-innovation': aiSamArticle,
};

// Local assets take priority over backend URLs (backend images may be broken)
export function getBlogImage(slug: string, apiImage?: string | null): string | undefined {
  return BLOG_IMAGES[slug] || apiImage || undefined;
}
