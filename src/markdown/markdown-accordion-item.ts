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
        const title = attrs.title ? attrs.title : ``;
        return (
          `
    <VAccordionItem
      :value="String(${idx})"
      transparent
    >
      <VAccordionTrigger class="is--h4__title">${title}</VAccordionTrigger><VAccordionContent class="is--body">`
        );
      }
      // Closing tag
      return '</VAccordionContent></VAccordionItem>\n';
    },
  },
];

export const accordionItem = (md: MarkdownIt) => {
  md.use(...createContainer('accordion-item', md));
};
