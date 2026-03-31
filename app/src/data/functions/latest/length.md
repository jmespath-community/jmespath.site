---
title: "length"
description: "Returns the length of the given argument using the following types rules:"
topic: "collections"
signature: "length(subject: string | array | object) -> number"
version: "latest"
---

## Description

Returns the length of the given argument using the following types rules:


1. string: returns the number of code points in the string


2. array: returns the number of elements in the array


3. object: returns the number of key-value pairs in the object


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `string, array, object` |  |


## Returns

**Type:** `number`

## Examples

```code
search(length('abc'), null) -> 3
```

```code
search(length(@), [1,2,3,4,5,6,7]) -> 7
```

```code
search(length(not_there), null) -> ERROR: invalid-type
```

```code
search(length(@), ["a","b","c"]) -> 3
```

```code
search(length(@), []) -> 0
```

```code
search(length(@), {}) -> 0
```

```code
search(length(@), {"foo":"bar","baz":"bam"}) -> 2
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
| `length('abc')` | `3` |
| `length('✓foo')` | `4` |
| `length('')` | `0` |
| `length(@)` | `12` |
| `length(strings[0])` | `1` |
| `length(str)` | `3` |
| `length(array)` | `6` |
| `length(objects)` | `2` |
| `length(false)` | `ERROR: invalid-type` |
| `length(foo)` | `ERROR: invalid-type` |

