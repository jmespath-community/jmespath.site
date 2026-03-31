---
title: "from_items"
description: "Returns an object from the provided array of key value pairs."
topic: "misc"
signature: "from_items(arg: array[any]) -> object"
version: "latest"
---

## Description

Returns an object from the provided array of key value pairs.
This function is the inversed of the `items()` function.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `arg` | `array[any]` |  |


## Returns

**Type:** `object`

## Examples

```code
search(from_items(@), [["one",1],["two",2]]) -> {"one":1,"two":2}
```

```code
search(from_items(@), [["one",1],["two",2],["one",3]]) -> {"one":3,"two":2}
```

