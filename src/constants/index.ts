import type { FeatureFlagListType, SupportedLanguagesListType } from "@customTypes/index";

export const serviceUrl: string =
  "https://rickandmortyapi.com/api/character/?page=18";

export const homePageOptions: string[] = [
  "subjects",
  "teachers",
  "students",
  "groups",
  "grades",
  "admin",
];

export const supportedLanguages: SupportedLanguagesListType = [
  { code: "en", nativeName: "English" },
  { code: "es", nativeName: "Spanish" },
];

export const featureFlags: FeatureFlagListType = [{ name: "enableMultiLanguage", type: "boolean" }]