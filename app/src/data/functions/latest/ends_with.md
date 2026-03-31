---
title: "ends_with"
description: "Returns true if the $subject ends with the $prefix, otherwise this"
topic: "strings"
signature: "ends_with(subject: string, prefix: string) -> boolean"
version: "latest"
---

## Description

Returns `true` if the `$subject` ends with the `$prefix`, otherwise this
function returns `false`.


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
search(ends_with(@, 'baz'), "foobarbaz") -> true
```

```code
search(ends_with(@, 'foo'), "foobarbaz") -> false
```

```code
search(ends_with(@, 'z'), "foobarbaz") -> true
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
| `ends_with(str, 'r')` | `true` |
| `ends_with(str, 'tr')` | `true` |
| `ends_with(str, 'Str')` | `true` |
| `ends_with(str, 'SStr')` | `false` |
| `ends_with(str, 'foo')` | `false` |
| `ends_with(str, 0)` | `ERROR: invalid-type` |

