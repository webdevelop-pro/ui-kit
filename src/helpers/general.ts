import { IFrontmatter } from 'UiKit/types/types';
import groupBy from 'lodash/groupBy';
import lodashIsEmpty from 'lodash/isEmpty';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';
import unionBy from 'lodash/unionBy';
import kebabCase from 'lodash/kebabCase';

export function isEmpty(obj: object) {
  return lodashIsEmpty(obj);
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
  return kebabCase(input);
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
  if (!items || items.length === 0) return [];
  const seen = new Set<string>();
  const result: string[] = [];

  items.forEach((item) => {
    const tags = (item.tags || []).filter(Boolean) as string[];
    tags.forEach((rawTag) => {
      const trimmed = rawTag.trim();
      if (!trimmed) return;
      const key = toLower(trimmed);
      if (seen.has(key)) return;
      seen.add(key);
      // Preserve common separators like '/' while capitalizing parts
      if (key.includes('/')) {
        const formatted = key.split('/').map((part) => startCase(part)).join('/');
        result.push(formatted);
      } else {
        result.push(startCase(key));
      }
    });
  });

  return result;
}

export function combineTags(
  tagsArray1: string[],
  tagsArray2: string[],
): string[] {
  return unionBy(tagsArray1, tagsArray2, (t) => toLower(t));
}

export function filterItemsByTag<T extends { tags?: string[] }>(
  items: T[],
  activeTag: string,
): T[] {
  if (activeTag !== '') {
    const normalize = (s: string) => kebabCase(toLower(s.trim()));
    const active = normalize(activeTag);
    return items.filter((item) => (item.tags || [])
      .some((tag) => normalize(tag) === active));
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

export function findPagesByParentFolder(pages: IFrontmatter[], url: string) {
  const res: IFrontmatter[] = [];

  // Find the page with the given URL
  const currentPage = pages.find((el) => el.url === url);

  // If the current page is not main, adjust the URL to the parent
  if (currentPage && !currentPage.is_main) {
    const parentUrl = url.substring(0, url.lastIndexOf('/'));
    url = parentUrl;
  }

  pages.forEach((el) => {
    if (url && el.url?.startsWith(url)) {
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
  return Object.keys(data).map((key) => {
    // Find the page object with the matching URL for the current key
    const page = pages.find((p) => p.url === key);

    if (page) {
      return {
        groupBy: page,
        items: data[key],
      };
    }

    return null; // Return null if no matching URL is found
  }).filter((item) => item !== null); // Filter out null values
}

// Define interfaces for the expected object structure
interface EntityValue {
  [key: string]: any;
}

interface TopLevelValue {
  entities: Record<string, EntityValue>;
}

interface MergedObject {
  [key: string]: TopLevelValue;
}

export function mergeObjects(obj1: any, obj2: any): MergedObject {
  if (!obj1 || !obj2) return {};
  const merged = { ...obj1 };

  Object.entries(obj2).forEach(([topKey, topValue]) => {
    // Ensure topValue is an object with entities property
    if (topValue && typeof topValue === 'object' && 'entities' in topValue) {
      merged[topKey] = merged[topKey] || { entities: {} };
      merged[topKey].entities = merged[topKey].entities || {};

      // Ensure topValue.entities is an object before iterating
      if (typeof topValue.entities === 'object' && topValue.entities !== null) {
        Object.entries(topValue.entities).forEach(([entityKey, entityValue]) => {
          // Ensure entityValue is an object before spreading
          if (entityValue && typeof entityValue === 'object') {
            merged[topKey].entities[entityKey] = {
              ...merged[topKey].entities[entityKey],
              ...entityValue,
            };
          } else {
            // If entityValue is not an object, just assign it directly
            merged[topKey].entities[entityKey] = entityValue;
          }
        });
      }
    }
  });

  return merged;
}

export const transformedArray = (mergedObj) => {
  if (!mergedObj || Object.keys(mergedObj).length === 0) return [];
  return (Object.keys(mergedObj)?.map((topKey) => {
    if (!mergedObj[topKey]?.entities) return [];
    return (
      Object.keys(mergedObj[topKey]?.entities).map((entityKey) => ({
        name: mergedObj[topKey].entities[entityKey].original_filename || mergedObj[topKey].entities[entityKey].filename,
        'object-type': topKey, // This will be the top-level key, e.g., companyA
        updated_at: mergedObj[topKey].entities[entityKey].updated_at,
        url: mergedObj[topKey].entities[entityKey].url,
      })));
  }).flat());
};
