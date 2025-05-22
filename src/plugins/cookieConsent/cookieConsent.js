// @ts-nocheck
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import * as CookieConsent from 'vanilla-cookieconsent';

export default {
  install: (app, pluginConfig) => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$CookieConsent = CookieConsent;
    app.config.globalProperties.$CookieConsent.run(pluginConfig);
  },
};
