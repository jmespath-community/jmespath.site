---
title: "zip"
description: "Accepts one or more arrays as arguments and returns an array of arrays"
topic: "misc"
signature: "zip(arg: array[any]) -> array[array[any]]"
version: "latest"
---

## Description

Accepts one or more arrays as arguments and returns an array of arrays
in which the _i-th_ array contains the _i-th_ element from each of the
argument arrays.
The returned array is truncated to the length of the shortest argument array.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `arg` | `array[any]` |  |


## Returns

**Type:** `array[array[any]]`

## Examples

```code
search(zip([a, b], [1, 2]), null) -> [["a",1],["b",2]]
```

```code
search(zip([a, b, c], [1, 2]), null) -> [["a",1],["b",2]]
```

