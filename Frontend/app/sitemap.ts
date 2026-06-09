// app/sitemap.ts

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.cloudpdf.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/word_to_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/image_to_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/merge_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/compress_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/powerpoint_to_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/protect_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/excel_to_pdf`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/split_pdf`,
      lastModified: new Date(),
    }
  ];
}