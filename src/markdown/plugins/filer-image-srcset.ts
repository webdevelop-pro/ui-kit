import type MarkdownIt from 'markdown-it';
import { getFilerImageSrcset } from '../../helpers/filerImage';

export const filerImageSrcset = (md: MarkdownIt): void => {
  const defaultImageRenderer = md.renderer.rules.image || ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });

  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const imageSrc = token.attrGet('src');
    const imageSrcset = getFilerImageSrcset(imageSrc ?? undefined);

    if (imageSrcset && !token.attrGet('srcset')) {
      token.attrSet('srcset', imageSrcset);
    }

    return defaultImageRenderer(tokens, idx, options, env, self);
  };
};

export default filerImageSrcset;
