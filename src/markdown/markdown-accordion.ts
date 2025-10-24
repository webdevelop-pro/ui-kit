import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';
import { IFrontmatter } from 'UiKit/types/types';


type ContainerArgs = [typeof container, string, { render: RenderRule }];
const createContainer = (
  klass: string,
  md: MarkdownIt,
): ContainerArgs => [
  container,
  klass,
  {
    render(tokens: Token[], idx: number, options: unknown, env: { frontmatter: IFrontmatter }) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        return (
          `
  <VAccordion
    type="single"
    collapsible
  >`
        );
      }
      // Closing tag
      return '</VAccordion>\n';
    },
  },
];

export const accordion = (md: MarkdownIt) => {
  md.use(...createContainer('accordion', md));
};
