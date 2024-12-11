import { IFrontmatter } from "UiKit/types/types";
import groupBy from 'lodash/groupBy';

export function isEmpty(obj: object) {
  // eslint-disable-next-line
  for (const prop of Object.keys(obj)) {
    return false;
  }

  return true;
}

export function formatPhoneNumber(phoneNumber: string | undefined): string | undefined {
  if (!phoneNumber) return undefined;
  // Remove all non-digit characters from the input string
  let cleaned: string = phoneNumber.replace(/\D/g, '');
  // Extract the country code (if present)
  let countryCode: string = '';
  if (cleaned.length > 10) {
    countryCode = `+${cleaned.slice(0, cleaned.length - 10)} `;
    // Remove country code from the cleaned string
    cleaned = cleaned.slice(-10);
  }
  // Extract the area code and the rest of the number
  const areaCode: string = cleaned.slice(0, 3);
  const middlePart: string = cleaned.slice(3, 6);
  const lastPart: string = cleaned.slice(6);

  // Format the phone number parts into the desired format
  const formattedPhoneNumber: string = `${countryCode}(${areaCode}) ${middlePart}-${lastPart}`;

  return formattedPhoneNumber;
}


export function booleanFormatToString(value: boolean | undefined) {
  if (value === undefined) return undefined;
  if (value) return 'Yes';
  return 'No';
}

export function checkObjectAndDeleteNotRequiredFields(
  defaultParameters: string[],
  requiredFields: string[],
  obj: object,
) {
  return Object.keys(obj).reduce((acc, key) => {
    if (defaultParameters.includes(key)) {
      acc[key] = obj[key]; // Set the new value for 'type'
    } else if (requiredFields.includes(obj[key])) {
      acc[key] = obj[key];
    } else {
      // If property value is not in requiredEmployment.value, delete the property
      delete acc[key];
    }
    return acc;
  }, {});
}

export function urlize(input: string): string {
  // Convert the input string to lowercase and replace spaces with hyphens
  let urlFriendlyString = input.toLowerCase().replace(/\s+/g, '-');

  // Remove any characters that are not alphanumeric or hyphens
  // eslint-disable-next-line
  urlFriendlyString = urlFriendlyString.replace(/[^a-z0-9\-]/g, '');

  // Remove any consecutive hyphens
  urlFriendlyString = urlFriendlyString.replace(/-{2,}/g, '-');

  // Trim leading and trailing hyphens
  urlFriendlyString = urlFriendlyString.replace(/^-+|-+$/g, '');

  return urlFriendlyString;
}


export function stripHtml(html: string) {
  if (typeof document !== 'undefined') {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }
  return html;
}


export function navigateWithQueryParams(url: string, params?: Record<string, string>): void {
  const urlObj = new URL(url, window.location.origin); // Create a URL object

  if (params) {
    // Add each query parameter to the URL using forEach
    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });
  }

  window.location.href = urlObj.toString(); // Navigate to the new URL
}

export function getLastModifiedDate(filePath: string): string | null {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];// Returns date in YYYY-MM-DD format
  } catch (err) {
    return null;
  }
}

export function getUniqueCapitalizedTags(items: { tags?: string[] | null }[]): string[] {
  const tagMap = new Map<string, string>(); // Map to store case-insensitive tag as key, original tag as value

  // Step 1: Flatten the tags, filter out null, undefined, or missing tags
  const allTags = items
    .flatMap((item) => item.tags || []);

  // Step 2: Populate the Map with case-insensitive keys but store original tags
  allTags.forEach((tag) => {
    const lowerCaseTag = tag.toLowerCase();
    if (!tagMap.has(lowerCaseTag)) {
      tagMap.set(lowerCaseTag, tag); // Store the original case version
    }
  });

  // Step 3: Get all unique tags with their original case and capitalize each word
  const capitalizedTags = [...tagMap.values()].map((tag) => tag.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '));

  return capitalizedTags;
}

export function combineTags(
  tagsArray1: string[],
  tagsArray2: string[],
): string[] {
  const tagMap = new Map<string, string>();

  // Helper function to add tags to the map (case-insensitive uniqueness)
  function addTagsToMap(tags: string[]) {
    tags.forEach((tag) => {
      const lowerCaseTag = tag.toLowerCase();
      if (!tagMap.has(lowerCaseTag)) {
        tagMap.set(lowerCaseTag, tag); // Store the original case version
      }
    });
  }

  // Add both arrays to the map
  addTagsToMap(tagsArray1);
  addTagsToMap(tagsArray2);

  // Return the unique tags in their original case
  return [...tagMap.values()];
}

export function filterItemsByTag<T extends { tags?: string[] }>(
  items: T[],
  activeTag: string,
): T[] {
  if (activeTag !== '') {
    return items.filter((item) => {
      const tags = item.tags?.map((tag) => tag.toLowerCase());
      return tags?.includes(activeTag.toLowerCase());
    });
  }
  return items;
}
export function getFirst200Characters(text: string) {
  let textLocal = text;
  // Find the last occurrence of '---' and cut the text from that point onward
  const lastDelimiterIndex = textLocal.lastIndexOf('---');
  if (lastDelimiterIndex !== -1) {
    textLocal = textLocal.slice(lastDelimiterIndex + 3); // +3 to skip the delimiter itself
  }

  // Remove leading newlines until the first non-newline character
  textLocal = textLocal.replace(/^\n+/, '');

  // Find the index of the next newline character
  const nextNewlineIndex = textLocal.indexOf('\n');

  // Extract the text up to the next newline
  let extractedText = '';
  if (nextNewlineIndex !== -1) {
    extractedText = textLocal.slice(0, nextNewlineIndex).trim();
  } else {
    // If there is no additional newline, use the entire remaining text
    extractedText = textLocal.trim();
  }

  // Return the first 200 characters from the extracted text
  return extractedText;
}

export function findBySameFolder(pages: IFrontmatter[], url:string) {
  const parent = `/${url.split('/').slice(0, -1).join('/')}`; // remove last element
  const res: IFrontmatter[] = [];
  pages.forEach((el) => {
    if (parent && el.url?.startsWith(parent)) {
      // console.log(parent, el.url);
      res.push(el);
    }
  });
  return res;
}

export function groupItemsByRawUrl(data: IFrontmatter[], url:string) {
  if (!data) return;
  const parent = `/${url.split('/').slice(0, -1).join('/')}`; // remove last element

  const res = groupBy(data, (item) => {
    const parts = item.url?.split('/');
    return parts.slice(0, -1).join('/'); // Full directory path
  });

  const filtered = Object.keys(res)
    .filter((key) => key.includes(parent)) // Apply the filter function to the keys
    .reduce((result, key) => {
      result[key] = res[key]; // Rebuild the filtered object
      return result;
    }, {});
  return filtered;
}

export function groupRelatedPagesFormat(pages: IFrontmatter[], data: Record<string, any>) {
  return Object.keys(data).map(key => {
    // Find the page object with the matching URL for the current key
    const page = pages.find(p => p.url === key);

    if (page) {
      return {
        groupBy: page,
        items: data[key]
      };
    }

    return null; // Return null if no matching URL is found
  }).filter(item => item !== null); // Filter out null values
}
