---
title: "reverse"
description: "Reverses the order of the $argument."
topic: "collections"
signature: "reverse(argument: string | array) -> array"
version: "2015-09-05-9e8d0e3"
---

## Description

Reverses the order of the `$argument`.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `argument` | `string, array` |  |


## Returns

**Type:** `array`

## Examples

```code
search(reverse(@), [0,1,2,3,4]) -> [4,3,2,1,0]
```

```code
search(reverse(@), []) -> []
```

```code
search(reverse(@), ["a","b","c",1,2,3]) -> [3,2,1,"c","b","a"]
```

```code
search(reverse(@), "abcd") -> "dcba"
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
| `reverse(numbers)` | `[5,4,3,-1]` |
| `reverse(array)` | `["100","a",5,4,3,-1]` |
| `reverse([])` | `[]` |
| `reverse()` | `""` |
| `reverse(hello world)` | `"dlrow olleh"` |

