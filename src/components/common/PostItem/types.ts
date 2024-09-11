
export interface IMarkdownOptions {
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
}

export interface IPostContent extends IMarkdownOptions {
  content: string;
}

export interface IAuthor {
  title: string;
  date: string;
  draft?: boolean;
  image: string;
  position?: string;
  description: string;
  tags?: string[];
  slug?: string;
}
