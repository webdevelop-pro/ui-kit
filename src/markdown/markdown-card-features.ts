import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';
import container from 'markdown-it-container';

type ContainerArgs = [typeof container, string, { render: RenderRule }];
const createContainer = (
  klass: string,
): ContainerArgs => [
  container,
  klass,
  {
    render(tokens: Token[], idx: number) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const attrs: Record<string, string> = {};
        if (token.attrs) {
          token.attrs.forEach((item: string[]) => {
            attrs[item[0]] = item[1];
          });
        }
        const buttonText = attrs['button-text'] || '';
        const href = attrs.href || '';
        const to = attrs.to || '';
        
        let props = '';
        if (buttonText) props += ` button-text="${buttonText}"`;
        if (href) props += ` href="${href}"`;
        if (to) props += ` :to="'${to}'"`;
        
        return `<VCardFeaturesHover${props}>`;
      }
      // Closing tag
      return '</VCardFeaturesHover>\n';
    },
  },
];

export const cardFeatures = (md: MarkdownIt) => {
  md.use(...createContainer('card-features', md));
};
