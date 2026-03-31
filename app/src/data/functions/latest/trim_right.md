---
title: "trim_right"
description: "Given the subject string, trim_right() removes the trailing characters found in chars."
topic: "strings"
signature: "trim_right(subject: string, chars?: string) -> string"
version: "latest"
---

## Description

Given the `subject` string, `trim_right()` removes the trailing characters found in `chars`.

Like the `trim()` function, the `chars` optional string parameter represents a set of characters to be removed.
`trim_right()` defaults to removing whitespace characters if `chars` is not specified or is an empty string.


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
search(trim_right(@), " subject string ") -> "subject string "
```

```code
search(trim_right(@, 's'), " subject string ") -> " subject string "
```

```code
search(trim_right(@, 'su'), " subject string ") -> " subject string "
```

```code
search(trim_right(@, 'su '), " subject string ") -> " subject string"
```

```code
search(trim_right(@, 'gsu '), " subject string ") -> " subject string"
```

