---
title: "trim"
description: "Given the subject string, trim() removes the leading and trailing characters found in chars."
topic: "strings"
signature: "trim(subject: string, chars?: string) -> string"
version: "latest"
---

## Description

Given the `subject` string, `trim()` removes the leading and trailing characters found in `chars`.

The `chars` optional parameter represents a set of characters to be removed from the `subject` string.
If this parameter is not specified, or is an empty string, whitespace characters are removed from the
`subject` string.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string` | Subject string |


### Optional

| Name | Type | Description |
|------|------|-------------|
| `chars` | `string` | Set of characters to be removed |


## Returns

**Type:** `string`

## Examples

```code
search(trim(@), " subject string ") -> "subject string"
```

```code
search(trim(@, ''), " subject string ") -> "subject string"
```

```code
search(trim(@, ' '), " subject string ") -> "subject string"
```

```code
search(trim(@, 's'), " subject string ") -> " subject string "
```

```code
search(trim(@, 'su'), " subject string ") -> " subject string "
```

```code
search(trim(@, 'su '), " subject string ") -> "bject string"
```

```code
search(trim(@, 'gsu '), " subject string ") -> "bject strin"
```

