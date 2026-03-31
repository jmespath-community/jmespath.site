---
title: "split"
description: "Given the subject string, split() breaks on ocurrences of the string search and returns an array."
topic: "strings"
signature: "split(subject: string, search: string, count?: number) -> array[string]"
version: "latest"
---

## Description

Given the `subject` string, `split()` breaks on ocurrences of the string `search` and returns an array.

The `split()` function returns an array containing each partial string between occurrences of `search`.
If `subject` contains no occurrences of the `search` text, an array containing just the original `subject`
string will be returned.

The `count` optional parameter specifies the maximum number of split points within the `search` string.
If this parameter is omitted, all occurrences are split. If `count` is not an integer or is negative,
an error MUST be raised.

If `count` is equal to `0`, `split()` returns an array containing a single element, the `subject` string.

Otherwise, the `split()` function breaks on occurrences of the `search` string up to `count` times. The
last string in the resulting array containing the remaining contents of the `subject` string unmodified.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string` | Subject string |
| `search` | `string` | Text separator |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `count` | `number` | Number of splits to perform |


## Returns

**Type:** `array[string]`

## Examples

```code
search(split(all chars, ), null) -> ["a","l","l"," ","c","h","a","r","s"]
```

```code
search(split(/, /), null) -> ["",""]
```

```code
search(split(average|-|min|-|max|-|mean|-|median, '|-|'), "average|-|min|-|max|-|mean|-|median") -> ["average","min","max","mean","median"]
```

```code
search(split(average|-|min|-|max|-|mean|-|median, '|-|', `3`), "average|-|min|-|max|-|mean|-|median") -> ["average","min","max","mean|-|median"]
```

```code
search(split(average|-|min|-|max|-|mean|-|median, '|-|', `2`), "average|-|min|-|max|-|mean|-|median") -> ["average","min","max|-|mean|-|median"]
```

```code
search(split(average|-|min|-|max|-|mean|-|median, '|-|', `1`), "average|-|min|-|max|-|mean|-|median") -> ["average","min|-|max|-|mean|-|median"]
```

```code
search(split(average|-|min|-|max|-|mean|-|median, '|-|', `0`), "average|-|min|-|max|-|mean|-|median") -> ["average|-|min|-|max|-|mean|-|median"]
```

```code
search(split(average|-|min|-|max|-|mean|-|median, '-'), "average|-|min|-|max|-|mean|-|median") -> ["average|","|min|","|max|","|mean|","|median"]
```

