---
title: "find_last"
description: "Given the $subject string, find_last() returns the zero-based index of the last occurence where the $sub substring appears in $subject or null if it does not appear."
topic: "strings"
signature: "find_last(subject: string, sub: string, start?: number, end?: number) -> number"
version: "latest"
---

## Description

Given the `$subject` string, `find_last()` returns the zero-based index of the last occurence where the `$sub` substring appears in `$subject` or `null` if it does not appear. If either the `$subject` or the `$sub` argument is an empty string, `find_last()` returns `null`.

The `$start` and `$end` parameters are optional and allow restricting to the slice `[$start:$end]` the range within `$subject` in which `$sub` must be found.

- If `$start` is omitted, it defaults to `0` (which is the start of the `$subject` string).
- If `$end` is omitted, it defaults to `length(subject)` (which is past the end of the `$subject` string).

If not omitted, the `$start` or `$end` arguments are expected to be integers. Otherwise, an error MUST be raised.

Contrary to similar functions found in most popular programming languages, the `find_last()` function does not return `-1` if no occurrence of the substring can be found. Instead, it returns `null` for consistency reasons with how JMESPath behaves.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string` | Subject string |
| `sub` | `string` | Substring |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `start` | `number` | Position in the subject string where searching should start. |
| `end` | `number` | Position in the subject string where searching should end. |


## Returns

**Type:** `number`

## Examples

```code
search(find_last(@, string), "subject string") -> 8
```

```code
search(find_last(@, string, `8`), "subject string") -> 8
```

```code
search(find_last(@, string, `8`, `9`), "subject string") -> null
```

```code
search(find_last(@, string, `9`), "subject string") -> null
```

```code
search(find_last(@, s, `1`), "subject string") -> 8
```

```code
search(find_last(@, s, `0`, `7`), "subject string") -> 0
```

