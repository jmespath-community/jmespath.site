---
title: "min"
description: "Returns the lowest found number in the provided $collection argument."
topic: "math"
signature: "min(collection: array[number] | array[string]) -> number"
version: "latest"
---

## Description

Returns the lowest found number in the provided `$collection` argument.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `collection` | `array[number], array[string]` |  |


## Returns

**Type:** `number`

## Examples

```code
search(min(@), [10,15]) -> 10
```

```code
search(min(@), ["a","b"]) -> "a"
```

```code
search(min(@), ["a",2,"b"]) -> ERROR: invalid-type
```

```code
search(min(@), [10,false,20]) -> ERROR: invalid-type
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
| `min(numbers)` | `-1` |
| `min(decimals)` | `-1.5` |
| `min(abc)` | `ERROR: invalid-type` |
| `min(array)` | `ERROR: invalid-type` |
| `min(empty_list)` | `null` |
| `min(strings)` | `"a"` |

