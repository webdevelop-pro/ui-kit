// https://github.com/radiovisual/get-src/blob/master/index.js
function getSrc(input) {
  if (typeof input !== 'string') {
    throw new TypeError('getSrc expected a string');
  }
  const re = /src="(.*?)"/gm;
  const url = re.exec(input);

  if (url && url.length >= 2) {
    return url[1];
  }
  return '';
}

// https://github.com/radiovisual/get-video-id/blob/master/index.js
/**
 * Strip away any parameters following `?` or `/`
 * @param str
 * @returns {*}
 */
function stripParameters(str) {
  // Split parameters or split folder separator
  if (str.indexOf('?') > -1) {
    return str.split('?')[0];
  }
  if (str.indexOf('/') > -1) {
    return str.split('/')[0];
  }
  return str;
}

/**
 * Get the vimeo id.
 * @param {string} url - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function vimeo(url) {
  let str = url;
  if (str.indexOf('#') > -1) {
    [str] = str.split('#');
  }
  if (str.indexOf('?') > -1 && str.indexOf('clip_id=') === -1) {
    [str] = str.split('?');
  }

  let id;
  let arr;

  if (/https?:\/\/vimeo\.com\/[0-9]+$|https?:\/\/player\.vimeo\.com\/video\/[0-9]+$|https?:\/\/vimeo\.com\/channels|groups|album/igm.test(str)) {
    arr = str.split('/');
    if (arr && arr.length) {
      id = arr.pop();
    }
  } else if (/clip_id=/igm.test(str)) {
    arr = str.split('clip_id=');
    if (arr && arr.length) {
      [id] = arr[1].split('&');
    }
  }

  return id;
}

/**
 * Get the vine id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function vine(str) {
  const regex = /https:\/\/vine\.co\/v\/([a-zA-Z0-9]*)\/?/;
  const matches = regex.exec(str);
  return matches && matches[1];
}

/**
 * Get the Youtube Video id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function youtube(str) {
  // shortcode
  const shortcode = /youtube:\/\/|https?:\/\/youtu\.be\//g;

  if (shortcode.test(str)) {
    return stripParameters(str.split(shortcode)[1]);
  }

  // /v/ or /vi/
  const inlinev = /\/v\/|\/vi\//g;

  if (inlinev.test(str)) {
    return stripParameters(str.split(inlinev)[1]);
  }

  // v= or vi=
  const parameterv = /v=|vi=/g;

  if (parameterv.test(str)) {
    const arr = str.split(parameterv);
    return arr[1].split('&')[0];
  }

  // v= or vi=
  const parameterwebp = /\/an_webp\//g;

  if (parameterwebp.test(str)) {
    const webp = str.split(parameterwebp)[1];
    return stripParameters(webp);
  }

  // embed
  const embedreg = /\/embed\//g;

  if (embedreg.test(str)) {
    return stripParameters(str.split(embedreg)[1]);
  }

  // user
  const userreg = /\/user\//g;

  if (userreg.test(str)) {
    const elements = str.split('/');
    return stripParameters(elements.pop());
  }

  // attribution_link
  const attrreg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;

  if (attrreg.test(str)) {
    return str.match(attrreg)[1];
  }
  return '';
}

/**
 * Get the VideoPress id.
 * @param {string} str - the url from which you want to extract the id
 * @returns {string|undefined}
 */
function videopress(str) {
  let idRegex;
  if (str.indexOf('embed') > -1) {
    idRegex = /embed\/(\w{8})/;
    return str.match(idRegex)[1];
  }

  idRegex = /\/v\/(\w{8})/;

  const match = str.match(idRegex);

  if (match && match.length > 0) {
    return str.match(idRegex)[1];
  }
  return undefined;
}

export function getVideoMeta(url) {
  let str = url;
  if (typeof str !== 'string') {
    return '';
  }

  if (/<iframe/ig.test(str)) {
    str = getSrc(str);
  }

  // remove surrounding whitespaces or linefeeds
  str = str.trim();

  // remove the '-nocookie' flag from youtube urls
  str = str.replace('-nocookie', '');

  // remove any leading `www.`
  str = str.replace('/www.', '/');

  let metadata = {};

  // Try to handle google redirection uri
  if (/\/\/google/.test(str)) {
    // Find the redirection uri
    const matches = str.match(/url=([^&]+)&/);

    // Decode the found uri and replace current url string - continue with final link
    if (matches) {
      // Javascript can get encoded URI
      str = decodeURIComponent(matches[1]);
    }
  }

  if (/youtube|youtu\.be|i.ytimg\./.test(str)) {
    metadata = {
      id: youtube(str),
      service: 'youtube',
    };
  } else if (/vimeo/.test(str)) {
    metadata = {
      id: vimeo(str),
      service: 'vimeo',
    };
  } else if (/vine/.test(str)) {
    metadata = {
      id: vine(str),
      service: 'vine',
    };
  } else if (/videopress/.test(str)) {
    metadata = {
      id: videopress(str),
      service: 'videopress',
    };
  }
  return metadata;
}

// function getVideoThumb(videoMeta){
//   switch (videoMeta.service) {
//     case 'youtube':
//       return `https://i.ytimg.com/vi/${this.youtubeId}/sddefault.jpg`;
//     case 'vimeo':
//       return
//     default:
//       return '';
//   }
// }
//
// export function getVideoInfo(url) {
//   const videoMeta = getVideoMeta(url);
//   // https://www.youtube.com/embed/${this.youtubeId}?showinfo=0
//   // https://i.ytimg.com/vi/${this.youtubeId}/sddefault.jpg`;
// }
