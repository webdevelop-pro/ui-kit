
import { describe, it, expect } from "vitest";
import { Page, convertPages } from "./pages.ts";

describe("ConvertPages tests", () => {
  it("Draft test with sub pages", () => {
    const rawPages = [
      {
        draft: false,
        url: "/about-us"
      },
      {
        draft: true,
        url: "/book-a-call"
      },
      {
        draft: false,
        url: "/careers"
      },
      {
        draft: false,
        url: "/careers/anyone"
      },
      {
        draft: false,
        url: "/"
      },
    ];
    const pages = convertPages(rawPages);
    expect(pages.data.url).toBe("/");
    expect(Object.keys(pages.children).length).toBe(2);
    expect(pages.children.careers.children.anyone.data.url).toBe("/careers/anyone");
  });
  it("Number in page name test ", () => {
    const rawPages = [
      {
        draft: false,
        url: "/2024/10"
      },
      {
        draft: false,
        url: "/"
      },
    ];
    const pages = convertPages(rawPages);
    expect(pages.data.url).toBe("/");
    expect(pages.children['2024'].data.url).toBe("/2024");
  });
});

