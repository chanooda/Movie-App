export function replaceText(text) {
  let letters = ["”", "?", "!"];
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (i === text.length - 1) {
      result += text[i];
      continue;
    }
    if (text[i] === ".") {
      if (text[i - 1] !== "." && text[i + 1] !== ".") result += `${text[i]}\n`;
    } else if (
      letters.indexOf(text[i]) !== -1 &&
      text[i + 1] !== " " &&
      letters.indexOf(text[i + 1]) === -1
    )
      result += `${text[i]}\n`;
    else {
      result += text[i];
    }
  }

  return result;
}
