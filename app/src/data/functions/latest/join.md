---
title: "join"
description: "Returns all of the elements from the provided $stringsarray array joined"
topic: "collections"
signature: "join(glue: string, stringsarray: array[string]) -> string"
version: "latest"
---

## Description

Returns all of the elements from the provided `$stringsarray` array joined
together using the `$glue` argument as a separator between each.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `glue` | `string` |  |
| `stringsarray` | `array[string]` |  |


## Returns

**Type:** `string`

## Examples

```code
search(join(', ', @), ["a","b"]) -> "a, b"
```

```code
search(join('', @), ["a","b"]) -> "ab"
```

```code
search(join(', ', @), ["a",false,"b"]) -> ERROR: invalid-type
```

```code
search(join(', ', @), [false]) -> ERROR: invalid-type
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
| `join(', ', strings)` | `"a, b, c"` |
| `join(', ', ['a', 'b'])` | `"a, b"` |
| `join(', ', ['a', 0])` | `ERROR: invalid-type` |
| `join(', ', str)` | `ERROR: invalid-type` |
| `join('\|', strings)` | `"a\|b\|c"` |
| `join(2, strings)` | `ERROR: invalid-type` |
| `join('\|', decimals)` | `ERROR: invalid-type` |
| `join('\|', decimals[].to_string(@))` | `"1.01\|1.2\|-1.5"` |
| `join('\|', empty_list)` | `""` |

