# Hoogle discord bot

**This bot is currently under active development. The below is an approximation of how it should work once shipped.**

Further details, improvements, ideas, etc to follow...

---

This applications aims to bring [Hoogle](https://hoogle.haskell.org/), the popular Haskell API search engine, to Discord in the form of a simple bot.

Once invited to your server, example use:

```
/hoogle zipWith
```

which should give you the following result:

zipWith generalises zip by zipping with the function given as the first argument, instead of a tupling function.

```hs
zipWith (,) xs ys == zip xs ys
zipWith f [x1,x2,x3..] [y1,y2,y3..] == [f x1 y1, f x2 y2, f x3 y3..]
```

For example, zipWith (+) is applied to two lists to produce the list of corresponding sums:

```hs
>>> zipWith (+) [1, 2, 3] [4, 5, 6]
[5,7,9]
```

zipWith is right-lazy:

```hs
>>> let f = undefined

>>> zipWith f [] undefined
[]
```

zipWith is capable of list fusion, but it is restricted to its first list argument and its resulting list.