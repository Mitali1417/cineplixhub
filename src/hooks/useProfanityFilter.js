// import BadWordsNext from "bad-words-next";
// import en from "bad-words-next/lib/en";

// const useProfanityFilter = () => {
//   // Initialize BadWordsNext with English dictionary and custom words
//   const badwords = new BadWordsNext({ data: en });

//   const isSafeText = (text = "") => {
//     if (!text || typeof text !== "string") return true;
//     return !badwords.check(text);
//   };

//   const isSafeMovie = (movie = {}) => {
//     if (!movie || typeof movie !== "object") return true;

//     const textsToCheck = [
//       movie.title,
//       movie.overview,
//       movie.tagline,
//       // Add other fields you want to check
//       ...(movie.genres || []).map((genre) => genre.name),
//     ].filter(Boolean);

//     const combined = textsToCheck.join(" ");
//     return isSafeText(combined);
//   };

//   const cleanText = (text = "") => {
//     if (!text || typeof text !== "string") return text;
//     return badwords.filter(text, { replace: "*" });
//   };

//   return {
//     isSafeText,
//     isSafeMovie,
//     cleanText,
//   };
// };

// export default useProfanityFilter;
