
import { IBreadcrumb } from 'UiKit/components/VBreadcrumbs/VBreadcrumbs.vue';



export interface ICaseStudies {
  title: string;
  subtitle?: string;
  slug: string;
  topic: string;
  description: string;
  tags?: string[];
  cases: string[];
  info: {
    expertise?: string;
    deliverables?: string;
    techStack?: string;
  };
  highlightText: string;
  highlightInfo?: ICaseStudiesHighlightItem[];
  highlightBackground?: string;
  mainText: ICaseStudiesMain[];
  side: ICaseStudiesMainSide;
  timeline?: ICaseStudiesTimelineItem[];
  breadcrumbs: IBreadcrumb[];
  prev: string;
  next: string;
}


export interface ICaseStudiesTop {
  title: string;
  subtitle: string;
  text: string;
  tags: string[];
  info: {
    expertise: string;
    deliverables: string;
    techStack: string;
  };
}
export interface ICaseStudiesHighlightItem {
  text: string;
  tooltip?: string;
}
export interface ICaseStudiesHighlight {
  text: string;
  info?: ICaseStudiesHighlightItem[];
  background?: string;
}
export interface ICaseStudiesMain {
  text: string;
  title?: string;
  subtitle?: string;
  quote?: string;
}


export interface ICaseStudiesMainSide {
  title: string;
  infoTitle: string;
  infoText: string;
  topic: string;
}
export interface ICaseStudiesTimelineItemCard {
  title: string;
  duration: string;
  text: string;
  type?: 'active' | 'complete' | 'not-complete';
  variant?: 'primary' | 'inner' | 'highlight';
}
export interface ICaseStudiesTimelineItem {
  circleType?: 'active' | 'not-complete' | 'complete' | 'highlight';
  items: ICaseStudiesTimelineItemCard[];
}
