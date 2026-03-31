---
title: "sort"
description: "This function accepts an array $list argument and returns the sorted"
topic: "collections"
signature: "sort(list: array[number] | array[string]) -> array"
version: "latest"
---

## Description

This function accepts an array `$list` argument and returns the sorted
elements of the `$list` as an array.

The array must be a list of strings or numbers.  Sorting strings is based on
code points.  Locale is not taken into account.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `list` | `array[number], array[string]` |  |


## Returns

**Type:** `array`

## Examples

```code
search(sort(@), ["b","a","c"]) -> ["a","b","c"]
```

```code
search(sort(@), [1,"a","c"]) -> [1,"a","c"]
```

```code
search(sort(@), [false,[],null]) -> [[],null,false]
```

```code
search(sort(@), [[],{},false]) -> [{},[],false]
```

```code
search(sort(@), {"a":1,"b":2}) -> null
```

```code
search(sort(@), false) -> null
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
| `sort(keys(objects))` | `["bar","foo"]` |
| `sort(values(objects))` | `["bar","baz"]` |
| `sort(numbers)` | `[-1,3,4,5]` |
| `sort(strings)` | `["a","b","c"]` |
| `sort(decimals)` | `[-1.5,1.01,1.2]` |
| `sort(array)` | `ERROR: invalid-type` |
| `sort(abc)` | `ERROR: invalid-type` |
| `sort(empty_list)` | `[]` |
| `sort(@)` | `ERROR: invalid-type` |

