---
title: "ceil"
description: "Returns the next highest integer value by rounding up if necessary."
topic: "math"
signature: "ceil(value: number) -> number"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns the next highest integer value by rounding up if necessary.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `value` | `number` |  |


## Returns

**Type:** `number`

## Examples

```code
search(ceil(1.001), null) -> 2
```

```code
search(ceil(1.9), null) -> 2
```

```code
search(ceil(1), null) -> 1
```

```code
search(ceil(abc), null) -> null
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
| `ceil(1.2)` | `2` |
| `ceil(decimals[0])` | `2` |
| `ceil(decimals[1])` | `2` |
| `ceil(decimals[2])` | `-1` |
| `ceil(string)` | `ERROR: invalid-type` |

