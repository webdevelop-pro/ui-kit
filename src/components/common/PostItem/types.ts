
export interface IMarkdownOptions {
  title: string;
  subTitle?: string;
  description: string;
  date: string;
  image: string;
  slug?: string;
  authors?: string;
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
  favoriteTags?: string[];
  slug?: string;
}
