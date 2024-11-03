import type { SupportedLanguageType } from "@customTypes/index";

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

export const supportedLanguages: SupportedLanguageType[] = [
  { code: "en", nativeName: "English" },
  { code: "es", nativeName: "Spanish" },
];