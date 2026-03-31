---
title: "pad_right"
description: "Given the subject string, pad_right() adds characters to the end and returns a string of length at least width."
topic: "strings"
signature: "pad_right(subject: string, width: number, pad?: string) -> string"
version: "latest"
---

## Description

Given the `subject` string, `pad_right()` adds characters to the end and returns a string of length at least `width`.

The `pad` optional string parameter specifies the padding character.
If omitted, it defaults to an ASCII space (U+0020).
If present, it MUST have length 1, otherwise an error MUST be raised.

If the `subject` string has length greater than or equal to `width`, it is returned unmodified.

If `$width` is not an integer, an error MUST be raised.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string` | Subject string |
| `width` | `number` | Total width of the resulting string |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `pad` | `string` | Pad character |


## Returns

**Type:** `string`

## Examples

```code
search(pad_right(@, `0`), "string") -> "string"
```

```code
search(pad_right(@, `6`), "string") -> "string"
```

```code
search(pad_right(@, `10`), "string") -> "string    "
```

```code
search(pad_right(@, `10`, -), "string") -> "string----"
```

