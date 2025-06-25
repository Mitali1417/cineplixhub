// src/utils/profanityFilter.js

import BadWordsNext from "bad-words-next";
import en from "bad-words-next/lib/en";

const badwords = new BadWordsNext({ data: en });

export const isSafeText = (text = "") => {
  if (!text || typeof text !== "string") return true;
  return !badwords.check(text);
};

export const isSafeMovie = (movie = {}) => {
  if (!movie || typeof movie !== "object") return true;

  const textsToCheck = [
    movie.title,
    movie.overview,
    movie.tagline,
    ...(movie.genres || []).map((genre) => genre.name),
  ].filter(Boolean);

  const combined = textsToCheck.join(" ");
  return isSafeText(combined);
};

export const cleanText = (text = "") => {
  if (!text || typeof text !== "string") return text;
  return badwords.filter(text, { replace: "*" });
};
