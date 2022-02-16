import { DOMParser } from "./deps.ts";
import { cleanText } from "./utils.ts";

const zipWithJSONResponse = {
  "docs":
    "<a>zipWith</a> generalises <a>zip</a> by zipping with\nthe function given as the first argument, instead of a tupling\nfunction.\n\n<pre>\nzipWith (,) xs ys == zip xs ys\nzipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]\n</pre>\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to\nproduce the list of corresponding sums:\n\n<pre>\n&gt;&gt;&gt; zipWith (+) [1, 2, 3] [4, 5, 6]\n[5,7,9]\n</pre>\n\n<a>zipWith</a> is right-lazy:\n\n<pre>\n&gt;&gt;&gt; let f = undefined\n\n&gt;&gt;&gt; zipWith f [] undefined\n[]\n</pre>\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its\nfirst list argument and its resulting list.\n",
  "item":
    "<span class=name><s0>zipWith</s0></span> :: (a -&gt; b -&gt; c) -&gt; [a] -&gt; [b] -&gt; [c]",
  "module": {
    "name": "Prelude",
    "url": "https://hackage.haskell.org/package/base/docs/Prelude.html",
  },
  "package": {
    "name": "base",
    "url": "https://hackage.haskell.org/package/base",
  },
  "type": "",
  "url": "https://hackage.haskell.org/package/base/docs/Prelude.html#v:zipWith",
};

const doc = new DOMParser().parseFromString(
  cleanText(zipWithJSONResponse.docs),
  "text/html",
)!;
console.log(doc.textContent);
const block =
  "Sequential application.\n\nA few functors support an implementation of <a>&lt;\\*&gt;</a> that is more efficient than the default one.\n\n<h4><b>Example</b></h4>\n\nUsed in combination with <tt>(<tt>&lt;$&gt;</tt>)</tt>, <tt>(<a>&lt;\\*&gt;</a>)</tt> can be used to build a record.\n\n```hs\n\n&gt;&gt;&gt; data MyState = MyState {arg1 :: Foo, arg2 :: Bar, arg3 :: Baz}```\n\n```hs\n\n&gt;&gt;&gt; produceFoo :: Applicative f =&gt; f Foo```\n\n```hs\n\n&gt;&gt;&gt; produceBar :: Applicative f =&gt; f Bar\n\n&gt;&gt;&gt; produceBaz :: Applicative f =&gt; f Baz```\n\n```hs\n\n&gt;&gt;&gt; mkState :: Applicative f =&gt; f MyState\n\n&gt;&gt;&gt; mkState = MyState &lt;$&gt; produceFoo &lt;*&gt; produceBar &lt;*&gt; produceBaz```";

const item = new DOMParser().parseFromString(
  block,
  "text/html",
)!;
console.log(item.textContent);
