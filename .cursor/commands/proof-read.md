Correct any spelling, grammar, or punctuation errors in the blog post.

Ensure that any pictures linked by the blog post actually exist.

Pictures referenced by the blog post should be present in the `static` directory. For example:

```md
<img src="/blog/later-arc/final-ss.png" alt="Final product" />
```

The picture should be present in the `static` directory at `static/blog/later-arc/final-ss.png`.

Ensure any languages that are used in the blog post are supported by the markdown parser in `src/lib/utils/markdown.ts` if they aren't already supported add them to the `langs` array in the `highlighter` object.

Give constructive advice on how to improve the blog post. Where can the wording improve? What can be added to make the blog post better to read or more clear?
