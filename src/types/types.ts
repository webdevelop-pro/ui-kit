export interface IFrontmatter {
  title: string;
  subTitle?: string;
  description: string;
  publishDate: string;
  cover: {
    image: string;
  };
  slug?: string;
  author?: string;
  draft?: boolean;
  tags?: string[];
  route?: string;
  url?: string;
  layout?: string;
  pageSrc?: string;
  products?: string;
  summary?: string;
  is_main: boolean;
  order?: number;
  position?: string;
}

export interface IPostContent extends IFrontmatter {
  content: string;
}
