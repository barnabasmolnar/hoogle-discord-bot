// mock data user for various tests

export const zipWith = {
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

export const zipWithStripped = {
  "docs":
    "<a>zipWith</a> generalises <a>zip</a> by zipping with\nthe function given as the first argument, instead of a tupling\nfunction.\n\n<pre>\nzipWith (,) xs ys == zip xs ys\nzipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]\n</pre>\n\nFor example, <tt><a>zipWith</a> (+)</tt> is applied to two lists to\nproduce the list of corresponding sums:\n\n<pre>\n&gt;&gt;&gt; zipWith (+) [1, 2, 3] [4, 5, 6]\n[5,7,9]\n</pre>\n\n<a>zipWith</a> is right-lazy:\n\n<pre>\n&gt;&gt;&gt; let f = undefined\n\n&gt;&gt;&gt; zipWith f [] undefined\n[]\n</pre>\n\n<a>zipWith</a> is capable of list fusion, but it is restricted to its\nfirst list argument and its resulting list.\n",
  "item":
    "<span class=name><s0>zipWith</s0></span> :: (a -&gt; b -&gt; c) -&gt; [a] -&gt; [b] -&gt; [c]",
  "module": {
    "name": "Prelude",
  },
  "url": "https://hackage.haskell.org/package/base/docs/Prelude.html#v:zipWith",
};

export const mapResults = [{
  "docs":
    "<a>map</a> <tt>f xs</tt> is the list obtained by\napplying <tt>f</tt> to each element of <tt>xs</tt>, i.e.,\n\n<pre>\nmap f [x1, x2, ..., xn] == [f x1, f x2, ..., f xn]\nmap f [x1, x2, ...] == [f x1, f x2, ...]\n</pre>\n\n<pre>\n&gt;&gt;&gt; map (+1) [1, 2, 3]\n[2,3,4]\n</pre>\n",
  "item":
    "<span class=name><s0>map</s0></span> :: (a -&gt; b) -&gt; [a] -&gt; [b]",
  "module": {
    "name": "Prelude",
    "url": "https://hackage.haskell.org/package/base/docs/Prelude.html",
  },
  "package": {
    "name": "base",
    "url": "https://hackage.haskell.org/package/base",
  },
  "type": "",
  "url": "https://hackage.haskell.org/package/base/docs/Prelude.html#v:map",
}, {
  "docs":
    "<a>map</a> <tt>f xs</tt> is the list obtained by\napplying <tt>f</tt> to each element of <tt>xs</tt>, i.e.,\n\n<pre>\nmap f [x1, x2, ..., xn] == [f x1, f x2, ..., f xn]\nmap f [x1, x2, ...] == [f x1, f x2, ...]\n</pre>\n\n<pre>\n&gt;&gt;&gt; map (+1) [1, 2, 3]\n[2,3,4]\n</pre>\n",
  "item":
    "<span class=name><s0>map</s0></span> :: (a -&gt; b) -&gt; [a] -&gt; [b]",
  "module": {
    "name": "Data.List",
    "url": "https://hackage.haskell.org/package/base/docs/Data-List.html",
  },
  "package": {
    "name": "base",
    "url": "https://hackage.haskell.org/package/base",
  },
  "type": "",
  "url": "https://hackage.haskell.org/package/base/docs/Data-List.html#v:map",
}];

export const mapResultsStripped = [{
  "docs":
    "<a>map</a> <tt>f xs</tt> is the list obtained by\napplying <tt>f</tt> to each element of <tt>xs</tt>, i.e.,\n\n<pre>\nmap f [x1, x2, ..., xn] == [f x1, f x2, ..., f xn]\nmap f [x1, x2, ...] == [f x1, f x2, ...]\n</pre>\n\n<pre>\n&gt;&gt;&gt; map (+1) [1, 2, 3]\n[2,3,4]\n</pre>\n",
  "item":
    "<span class=name><s0>map</s0></span> :: (a -&gt; b) -&gt; [a] -&gt; [b]",
  "module": { "name": "Prelude" },
  "url": "https://hackage.haskell.org/package/base/docs/Prelude.html#v:map",
}, {
  "docs":
    "<a>map</a> <tt>f xs</tt> is the list obtained by\napplying <tt>f</tt> to each element of <tt>xs</tt>, i.e.,\n\n<pre>\nmap f [x1, x2, ..., xn] == [f x1, f x2, ..., f xn]\nmap f [x1, x2, ...] == [f x1, f x2, ...]\n</pre>\n\n<pre>\n&gt;&gt;&gt; map (+1) [1, 2, 3]\n[2,3,4]\n</pre>\n",
  "item":
    "<span class=name><s0>map</s0></span> :: (a -&gt; b) -&gt; [a] -&gt; [b]",
  "module": { "name": "Data.List" },
  "url": "https://hackage.haskell.org/package/base/docs/Data-List.html#v:map",
}];

export const seqAppl = {
  "docs":
    "Sequential application.\n\nA few functors support an implementation of <a>&lt;*&gt;</a> that is\nmore efficient than the default one.\n\n<h4><b>Example</b></h4>\n\nUsed in combination with <tt>(<tt>&lt;$&gt;</tt>)</tt>,\n<tt>(<a>&lt;*&gt;</a>)</tt> can be used to build a record.\n\n<pre>\n&gt;&gt;&gt; data MyState = MyState {arg1 :: Foo, arg2 :: Bar, arg3 :: Baz}\n</pre>\n\n<pre>\n&gt;&gt;&gt; produceFoo :: Applicative f =&gt; f Foo\n</pre>\n\n<pre>\n&gt;&gt;&gt; produceBar :: Applicative f =&gt; f Bar\n\n&gt;&gt;&gt; produceBaz :: Applicative f =&gt; f Baz\n</pre>\n\n<pre>\n&gt;&gt;&gt; mkState :: Applicative f =&gt; f MyState\n\n&gt;&gt;&gt; mkState = MyState &lt;$&gt; produceFoo &lt;*&gt; produceBar &lt;*&gt; produceBaz\n</pre>\n",
  "item":
    "<span class=name>(<s0>&lt;*&gt;</s0>)</span> :: Applicative f =&gt; f (a -&gt; b) -&gt; f a -&gt; f b",
  "module": {
    "name": "Prelude",
    "url": "https://hackage.haskell.org/package/base/docs/Prelude.html",
  },
  "package": {
    "name": "base",
    "url": "https://hackage.haskell.org/package/base",
  },
  "type": "",
  "url":
    "https://hackage.haskell.org/package/base/docs/Prelude.html#v:-60--42--62-",
};

export const superman =
  "I call infix fmap superman... Doesn't it look like that? Be honest.\n\n<pre>\n&gt;&gt;&gt; mkState :: Applicative f =&gt; f MyState\n\n&gt;&gt;&gt; mkState = MyState &lt;$&gt; produceFoo &lt;*&gt; produceBar &lt;*&gt; produceBaz\n</pre>";
