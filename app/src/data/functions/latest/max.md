---
title: "max"
description: "Returns the highest found number in the provided array argument."
topic: "math"
signature: "max(collection: array[number] | array[string]) -> number"
version: "latest"
---

## Description

Returns the highest found number in the provided array argument.

An empty array will produce a return value of null.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `collection` | `array[number], array[string]` |  |


## Returns

**Type:** `number`

## Examples

```code
search(max(@), [10,15]) -> 15
```

```code
search(max(@), ["a","b"]) -> "b"
```

```code
search(max(@), ["a",2,"b"]) -> ERROR: invalid-type
```

```code
search(max(@), [10,false,20]) -> ERROR: invalid-type
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
| `max(numbers)` | `5` |
| `max(decimals)` | `1.2` |
| `max(strings)` | `"c"` |
| `max(abc)` | `ERROR: invalid-type` |
| `max(array)` | `ERROR: invalid-type` |
| `max(empty_list)` | `null` |

