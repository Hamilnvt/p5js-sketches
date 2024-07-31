// Title: "prova"
// Created: sab 27 lug 2024, 12:03:24, CEST

const is_uppercase = (ch) => {
  let n = ch.charCodeAt(0);
  return (n >= 65 && n <= 90);
}
const is_lowercase = (ch) => {
  let n = ch.charCodeAt(0);
  return (n >= 97 && n <= 122);
}
const is_number = (ch) => {
  let n = ch.charCodeAt(0);
  return (n >= 48 && n <= 57);
}
const is_valid = (ch) => {
  return (is_lowercase(ch) || is_uppercase(ch) || is_number(ch) || ch === '_')
}

const username = "pippo";

for (let ch of username) {
  is_valid(ch) ? console.log(ch + " is valid") : console.log(ch + " is not valid");
}
