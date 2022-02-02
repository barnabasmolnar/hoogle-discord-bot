import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {
  cleanText,
  makePreMap,
  mapBackPres,
  preToMd,
  replaceSingleLinebreaksWithSpace,
} from "./utils.ts";

Deno.test("replace single linebreaks with a space", () => {
  const zipWith =
    "<a>zipWith</a> generalises <a>zip</a> by zipping with\nthe function given as the first argument, instead of a tupling\nfunction.\n\nCODE_SAMPLE_1\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to\nproduce the list of corresponding sums:\n\nCODE_SAMPLE_2\n\n<a>zipWith</a> is right-lazy:\n\nCODE_SAMPLE_3\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its\nfirst list argument and its resulting list.\n";

  const expected =
    "<a>zipWith</a> generalises <a>zip</a> by zipping with the function given as the first argument, instead of a tupling function.\n\nCODE_SAMPLE_1\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to produce the list of corresponding sums:\n\nCODE_SAMPLE_2\n\n<a>zipWith</a> is right-lazy:\n\nCODE_SAMPLE_3\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its first list argument and its resulting list. ";

  assertEquals(
    replaceSingleLinebreaksWithSpace("...this is\nthe end of a sentence."),
    "...this is the end of a sentence.",
  );
  assertEquals(
    replaceSingleLinebreaksWithSpace("Cool\nsentence 1.\n\nCool sentence 2.\n"),
    "Cool sentence 1.\n\nCool sentence 2. ",
  );
  assertEquals(replaceSingleLinebreaksWithSpace("\nzipWith"), " zipWith");
  assertEquals(replaceSingleLinebreaksWithSpace(zipWith), expected);
});

Deno.test("replace pre tags with placeholders", () => {
  const zipWith =
    "<a>zipWith</a> generalises <a>zip</a> by zipping with\nthe function given as the first argument, instead of a tupling\nfunction.\n\n<pre>\nzipWith (,) xs ys == zip xs ys\nzipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]\n</pre>\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to\nproduce the list of corresponding sums:\n\n<pre>\n&gt;&gt;&gt; zipWith (+) [1, 2, 3] [4, 5, 6]\n[5,7,9]\n</pre>\n\n<a>zipWith</a> is right-lazy:\n\n<pre>\n&gt;&gt;&gt; let f = undefined\n\n&gt;&gt;&gt; zipWith f [] undefined\n[]\n</pre>\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its\nfirst list argument and its resulting list.\n";

  const simple =
    "Yo hello watup <pre>\nim aight bro</pre>. That's so <pre>frickin' cool brah, yeah</pre>.";

  assertEquals(makePreMap(simple), {
    matches: [
      "<pre>\nim aight bro</pre>",
      "<pre>frickin' cool brah, yeah</pre>",
    ],
    str: "Yo hello watup !PRE_REPLACEMENT!. That's so !PRE_REPLACEMENT!.",
  });

  assertEquals(makePreMap(zipWith), {
    matches: [
      "<pre>\nzipWith (,) xs ys == zip xs ys\nzipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]\n</pre>",
      "<pre>\n&gt;&gt;&gt; zipWith (+) [1, 2, 3] [4, 5, 6]\n[5,7,9]\n</pre>",
      "<pre>\n&gt;&gt;&gt; let f = undefined\n\n&gt;&gt;&gt; zipWith f [] undefined\n[]\n</pre>",
    ],
    str:
      "<a>zipWith</a> generalises <a>zip</a> by zipping with\nthe function given as the first argument, instead of a tupling\nfunction.\n\n!PRE_REPLACEMENT!\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to\nproduce the list of corresponding sums:\n\n!PRE_REPLACEMENT!\n\n<a>zipWith</a> is right-lazy:\n\n!PRE_REPLACEMENT!\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its\nfirst list argument and its resulting list.\n",
  });

  assertEquals(makePreMap("blablabla"), { matches: [], str: "blablabla" });
});

Deno.test("map back pre replacements with actual pre elements", () => {
  const simple = {
    matches: [
      "<pre>\nim aight bro</pre>",
      "<pre>frickin' cool brah, yeah</pre>",
    ],
    str:
      "Yo hello watup !PRE_REPLACEMENT!. That's so !PRE_REPLACEMENT!. Here is a\nrandom line break\nand another because why not.\n",
  };

  assertEquals(
    mapBackPres(simple),
    "Yo hello watup <pre>\nim aight bro</pre>. That's so <pre>frickin' cool brah, yeah</pre>. Here is a\nrandom line break\nand another because why not.\n",
  );
});

Deno.test("replace pre tags with markdown style code blocks", () => {
  const simple =
    "Yo hello watup <pre>\nim aight bro</pre>. That's so <pre>frickin' cool brah, yeah</pre>. Here is a\nrandom line break\nand another because why not.\n";

  assertEquals(
    preToMd(simple),
    "Yo hello watup ```hs\nim aight bro```. That's so ```hsfrickin' cool brah, yeah```. Here is a\nrandom line break\nand another because why not.\n",
  );
});

Deno.test("clean docs text", () => {
  const zipWith =
    "<a>zipWith</a> generalises <a>zip</a> by zipping with\nthe function given as the first argument, instead of a tupling\nfunction.\n\n<pre>\nzipWith (,) xs ys == zip xs ys\nzipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]\n</pre>\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to\nproduce the list of corresponding sums:\n\n<pre>\n&gt;&gt;&gt; zipWith (+) [1, 2, 3] [4, 5, 6]\n[5,7,9]\n</pre>\n\n<a>zipWith</a> is right-lazy:\n\n<pre>\n&gt;&gt;&gt; let f = undefined\n\n&gt;&gt;&gt; zipWith f [] undefined\n[]\n</pre>\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its\nfirst list argument and its resulting list.\n";

  const simple =
    "Yo hello watup <pre>\nim aight bro</pre>. That's so <pre>frickin' cool brah, yeah</pre>. Here is a\nrandom line break\nand another because why not.\n";

  assertEquals(
    cleanText(simple),
    "Yo hello watup ```hs\nim aight bro```. That's so ```hsfrickin' cool brah, yeah```. Here is a random line break and another because why not.",
  );

  assertEquals(
    cleanText(zipWith),
    "<a>zipWith</a> generalises <a>zip</a> by zipping with the function given as the first argument, instead of a tupling function.\n\n```hs\nzipWith (,) xs ys == zip xs ys\nzipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]\n```\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to produce the list of corresponding sums:\n\n```hs\n&gt;&gt;&gt; zipWith (+) [1, 2, 3] [4, 5, 6]\n[5,7,9]\n```\n\n<a>zipWith</a> is right-lazy:\n\n```hs\n&gt;&gt;&gt; let f = undefined\n\n&gt;&gt;&gt; zipWith f [] undefined\n[]\n```\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its first list argument and its resulting list.",
  );
});
