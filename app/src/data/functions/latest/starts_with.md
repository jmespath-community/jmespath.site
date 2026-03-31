---
title: "starts_with"
description: "Returns true if the $subject starts with the $prefix, otherwise"
topic: "strings"
signature: "starts_with(subject: string, prefix: string) -> boolean"
version: "latest"
---

## Description

Returns `true` if the `$subject` starts with the `$prefix`, otherwise
this function returns `false`.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string` |  |
| `prefix` | `string` |  |


## Returns

**Type:** `boolean`

## Examples

```code
search(starts_with(@, 'foo'), "foobarbaz") -> true
```

```code
search(starts_with(@, 'baz'), "foobarbaz") -> false
```

```code
search(starts_with(@, 'f'), "foobarbaz") -> true
```

Given the following JSON input:

```json
{
  "foo": -1,
  "zero": 0,
  "numbers": [
    -1,
    3,
    4,
    5
  ],
  "array": [
    -1,
    3,
    4,
    5,
    "a",
    "100"
  ],
  "strings": [
    "a",
    "b",
    "c"
  ],
  "decimals": [
    1.01,
    1.2,
    -1.5
  ],
  "str": "Str",
  "false": false,
  "empty_list": [],
  "empty_hash": {},
  "objects": {
    "foo": "bar",
    "bar": "baz"
  },
  "null_key": null
}
```

| Expression | Result |
|------------|--------|
| `starts_with(str, 'S')` | `true` |
| `starts_with(str, 'St')` | `true` |
| `starts_with(str, 'Str')` | `true` |
| `starts_with(str, 'String')` | `false` |
| `starts_with(str, 0)` | `ERROR: invalid-type` |

