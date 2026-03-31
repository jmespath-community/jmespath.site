---
title: "sum"
description: "Returns the sum of the provided array argument."
topic: "math"
signature: "sum(collection: array[number]) -> number"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns the sum of the provided array argument.

An empty array will produce a return value of 0.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `collection` | `array[number]` |  |


## Returns

**Type:** `number`

## Examples

```code
search(sum(@), [10,15]) -> 25
```

```code
search(sum(@), [10,false,20]) -> ERROR: invalid-type
```

```code
search(sum([].to_number(@)), [10,false,20]) -> 30
```

```code
search(sum(@), []) -> 0
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
| `sum(numbers)` | `11` |
| `sum(decimals)` | `0.71` |
| `sum(array)` | `ERROR: invalid-type` |
| `sum(array[].to_number(@))` | `111` |
| `sum([])` | `0` |

