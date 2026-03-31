---
title: "map"
description: "Apply the expr to every element in the elements array"
topic: "collections"
signature: "map(expr: expression, elements: array[any]) -> array[any]"
version: "2015-09-05-9e8d0e3"
---

## Description

Apply the `expr` to every element in the `elements` array
and return the array of results.  An `elements` of length
N will produce a return array of length N.

Unlike a projection, (`[\*].bar`), `map()` will include
the result of applying the `expr` for every element in the
`elements` array, even if the result if `null`.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `expr` | `expression` |  |
| `elements` | `array[any]` |  |


## Returns

**Type:** `array[any]`

## Examples

```code
search(map(&foo, array), {"array":[{"foo":"a"},{"foo":"b"},{},[],{"foo":"f"}]}) -> ["a","b",null,null,"f"]
```

```code
search(map(&[], @), [[1,2,3,[4]],[5,6,7,[8,9]]]) -> [[1,2,3,4],[5,6,7,8,9]]
```

```code
search(map(&[], array), {"array":[[1,2,3,[4]],[5,6,7,[8,9]]]}) -> [[1,2,3,4],[5,6,7,8,9]]
```

Given the following JSON input:

```json
{
  "people": [
    {
      "a": 10,
      "b": 1,
      "c": "z"
    },
    {
      "a": 10,
      "b": 2,
      "c": null
    },
    {
      "a": 10,
      "b": 3
    },
    {
      "a": 10,
      "b": 4,
      "c": "z"
    },
    {
      "a": 10,
      "b": 5,
      "c": null
    },
    {
      "a": 10,
      "b": 6
    },
    {
      "a": 10,
      "b": 7,
      "c": "z"
    },
    {
      "a": 10,
      "b": 8,
      "c": null
    },
    {
      "a": 10,
      "b": 9
    }
  ],
  "empty": []
}
```

| Expression | Result |
|------------|--------|
| `map(&a, people)` | `[10,10,10,10,10,10,10,10,10]` |
| `map(&c, people)` | `["z",null,null,"z",null,null,"z",null,null]` |
| `map(&a, badkey)` | `ERROR: invalid-type` |
| `map(&foo, empty)` | `[]` |

Given the following JSON input:

```json
{
  "array": [
    {
      "foo": {
        "bar": "yes1"
      }
    },
    {
      "foo": {
        "bar": "yes2"
      }
    },
    {
      "foo1": {
        "bar": "no"
      }
    }
  ]
}
```

| Expression | Result |
|------------|--------|
| `map(&foo.bar, array)` | `["yes1","yes2",null]` |
| `map(&foo1.bar, array)` | `[null,null,"no"]` |
| `map(&foo.bar.baz, array)` | `[null,null,null]` |

