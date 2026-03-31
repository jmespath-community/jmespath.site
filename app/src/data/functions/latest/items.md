---
title: "items"
description: "Returns an array of key-value pairs for the provided input object."
topic: "misc"
signature: "items(obj: object) -> array[any]"
version: "latest"
---

## Description

Returns an array of key-value pairs for the provided input object.
Each pair is a 2-item array with the first item being the key and
the second item being the value.
This function is the inversed of the `from_items()` function.

Note that because JSON hashes are inheritently unordered,
the key value pairs of the provided object $obj are inheritently unordered.
Implementations are not required to return values in any specific order.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `obj` | `object` |  |


## Returns

**Type:** `array[any]`

## Examples

```code
search(items(@), {"a":"first","b":"second"}) -> [["a","first"],["b","second"]]
```

