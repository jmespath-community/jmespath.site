---
title: "avg"
description: "Returns the average of the elements in the provided array."
topic: "math"
signature: "avg(elements: array[number]) -> number,null"
version: "latest"
---

## Description

Returns the average of the elements in the provided array.

An empty array will produce a return value of null.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `elements` | `array[number]` | array of numbers to calculate average from |


## Returns

**Type:** `number,null`

average value of passed elements

## Examples

```code
search(avg(@), [10,15,20]) -> 15
```

```code
search(avg(@), [10,false,20]) -> ERROR: invalid-type
```

```code
search(avg(@), [false]) -> ERROR: invalid-type
```

```code
search(avg(@), false) -> ERROR: invalid-type
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
| `avg(numbers)` | `2.75` |
| `avg(array)` | `ERROR: invalid-type` |
| `avg(abc)` | `ERROR: invalid-type` |
| `avg(foo)` | `ERROR: invalid-type` |
| `avg(@)` | `ERROR: invalid-type` |
| `avg(strings)` | `ERROR: invalid-type` |
| `avg(empty_list)` | `null` |

