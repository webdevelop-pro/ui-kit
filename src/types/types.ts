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
}

export interface IPostContent extends IFrontmatter {
  content: string;
}

export interface IAuthor {
  title: string;
  publishDate: string;
  draft?: boolean;
  cover: {
    image: string;
  };
  position?: string;
  description: string;
  tags?: string[];
  slug?: string;
  url?: string;
}
