
import { data as allPages } from '@/store/all.data';
import { filterAndSortByOrderElements } from 'UiKit/helpers/allData';
import { IFrontmatter } from 'UiKit/types/types';

const ourProcess = filterAndSortByOrderElements(allPages as IFrontmatter[], 'slug', 'our-process');
const developmentStages = filterAndSortByOrderElements(allPages as IFrontmatter[], 'slug', 'development-stages');
const howWeCanAssistData = filterAndSortByOrderElements(allPages as IFrontmatter[], 'slug', 'how-can-we-assist');
export const HowCanWeAssistItems = [
  {
    image: '/images/assist-group-1.svg',
    title: developmentStages[0].title,
    description: 'Navigate through our developmental stages, tracing the journey from concept to fruition.',
    url: developmentStages[0].url,
  },
  {
    image: '/images/assist-group-2.svg',
    title: ourProcess[0].title,
    description: 'Explore our pipelines, revealing diverse pathways shaping our future offerings.',
    url: ourProcess[0].url,
  },
];
export const howWeCanAssist = {
  title: 'How we can assist you',
  description: 'Explore personalized support options designed for a smooth and enjoyable experience with us.',
  url: howWeCanAssistData[0].url,
  items: HowCanWeAssistItems,
  buttonText: 'How We Can Assist',
};
