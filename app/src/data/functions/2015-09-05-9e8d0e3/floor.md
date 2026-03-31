---
title: "floor"
description: "Returns the next lowest integer value by rounding down if necessary."
topic: "math"
signature: "floor(value: number) -> number"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns the next lowest integer value by rounding down if necessary.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `value` | `number` |  |


## Returns

**Type:** `number`

## Examples

```code
search(floor(1.001), null) -> 1
```

```code
search(floor(1.9), null) -> 1
```

```code
search(floor(1), null) -> 1
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
| `floor(1.2)` | `1` |
| `floor(string)` | `ERROR: invalid-type` |
| `floor(decimals[0])` | `1` |
| `floor(foo)` | `-1` |
| `floor(str)` | `ERROR: invalid-type` |

