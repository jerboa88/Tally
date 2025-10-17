import { defineCollection, z } from 'astro:content';

/**
 * Shared Zod schema for page frontmatter across all locales.
 */
const pageSchema = z.object({});

/**
 * Content collections for each supported locale.
 *
 * Each locale has its own collection to organize markdown content by language
 * (ex. src/content/en/, src/content/es/).
 */
export const collections = {
	en: defineCollection({ schema: pageSchema }),
};
