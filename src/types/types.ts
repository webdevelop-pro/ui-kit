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
  menuGroup?: string;
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
}
