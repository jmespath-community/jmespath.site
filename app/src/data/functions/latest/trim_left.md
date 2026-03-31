---
title: "trim_left"
description: "Given the subject string, trim_left() removes the leading characters found in chars."
topic: "strings"
signature: "trim_left(subject: string, chars?: string) -> string"
version: "latest"
---

## Description

Given the `subject` string, `trim_left()` removes the leading characters found in `chars`.

Like the `trim()` function, the `chars` optional string parameter represents a set of characters to be removed.
`trim_left()` defaults to removing whitespace characters if `chars` is not specified or is an empty string.


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
search(trim_left(@), " subject string ") -> "subject string "
```

```code
search(trim_left(@, 's'), " subject string ") -> " subject string "
```

```code
search(trim_left(@, 'su'), " subject string ") -> " subject string "
```

```code
search(trim_left(@, 'su '), " subject string ") -> "bject string "
```

```code
search(trim_left(@, 'gsu '), " subject string ") -> "bject string "
```

