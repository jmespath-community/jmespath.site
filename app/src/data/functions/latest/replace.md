---
title: "replace"
description: "Given the subject string, replace() replaces ocurrences of the old substring with the new substring."
topic: "strings"
signature: "replace(subject: string, old: string, new: string, count?: number) -> string"
version: "latest"
---

## Description

Given the `subject` string, `replace()` replaces ocurrences of the `old` substring with the `new` substring.

The `count` optional parameter specifies how many occurrences of the `old` substring in `subject` are to be replaced.
If this parameter is omitted, all occurrences are replaced. If `count` is not an integer or is negative,

The `replace()` function has no effect if `count` is `0`.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string` | Subject string |
| `old` | `string` | Text that must be replaced in the subject string |
| `new` | `string` | Text used as a replacement |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `count` | `number` | Number of replacements to perform |


## Returns

**Type:** `string`

## Examples

```code
search(replace(@, 'aa', '-', `0`), "aabaaabaaaab") -> "aabaaabaaaab"
```

```code
search(replace(@, 'aa', '-', `1`), "aabaaabaaaab") -> "-baaabaaaab"
```

```code
search(replace(@, 'aa', '-', `2`), "aabaaabaaaab") -> "-b-abaaaab"
```

```code
search(replace(@, 'aa', '-', `3`), "aabaaabaaaab") -> "-b-ab-aab"
```

```code
search(replace(@, 'aa', '-'), "aabaaabaaaab") -> "-b-ab--b"
```

