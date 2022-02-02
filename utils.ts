export const replaceSingleLinebreaksWithSpace = (str: string): string =>
  str.replace(/(?<!\n)\n(?!\n)/g, " ");

export const makePreMap = (str: string) => {
  const r = /<pre>(.*?)<\/pre>/gs;
  const matches = str.match(r) ?? [];

  const newStr = str.replaceAll(r, "!PRE_REPLACEMENT!");

  return { matches, str: newStr };
};

export const mapBackPres = (
  preMap: { matches: RegExpMatchArray; str: string },
) => {
  const { matches, str } = preMap;
  let result = str;
  for (const match of matches) {
    result = result.replace("!PRE_REPLACEMENT!", match);
  }
  return result;
};

export const preToMd = (str: string) =>
  str.replaceAll("<pre>", "```hs").replaceAll("</pre>", "```");

export const cleanText = (text: string) => {
  const { matches, str } = makePreMap(text);
  const strWithLineBreaksReplaced = replaceSingleLinebreaksWithSpace(str);
  const mappedBack = mapBackPres({ matches, str: strWithLineBreaksReplaced });
  return preToMd(mappedBack).trimEnd();
};
