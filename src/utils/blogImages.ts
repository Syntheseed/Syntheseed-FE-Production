import strategyMeetsDisruption from '../../assets/StrategyMeetsDisruption.jpeg';
import promisesnchalOfAGI from '../../assets/promisesnchalOfAGI.jpeg';
import fromAbstractToConcrete from '../../assets/fromAbstractToConcrete.jpeg';
import unlockingPotWithin from '../../assets/unlockingPotWithin.jpeg';

const BLOG_IMAGE_FALLBACKS: Record<string, string> = {
  'when-strategy-meets-disruption-key-lessons-from-th': strategyMeetsDisruption,
  'the-promise-and-challenges-of-artificial-general-i': promisesnchalOfAGI,
  'from-abstract-to-concrete': fromAbstractToConcrete,
  'Unlocking_the_Potential_Within': unlockingPotWithin,
};

export function getBlogImage(slug: string, apiImage?: string | null): string | undefined {
  return apiImage || BLOG_IMAGE_FALLBACKS[slug] || undefined;
}
