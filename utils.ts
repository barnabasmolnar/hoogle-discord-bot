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
    result = result.replace("!PRE_REPLACEMENT!", () => match);
    // using a function for the 2nd parameter of replace allows us not to worry
    // about escaping character clusters with special meaning
    // for instance, <$> (infix fmap) matches can contain $& which is
    // apparently a special replacement pattern
    // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_string_as_a_parameter
  }
  return result;
};

export const preToMd = (str: string) =>
  str.replaceAll("<pre>", () => "```hs\n").replaceAll("</pre>", "```");

export const cleanText = (text: string) => {
  const { matches, str } = makePreMap(text);
  const strWithLineBreaksReplaced = replaceSingleLinebreaksWithSpace(str);
  const mappedBack = mapBackPres({ matches, str: strWithLineBreaksReplaced });
  return preToMd(mappedBack).trimEnd();
};
