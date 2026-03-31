---
title: "contains"
description: "Returns true if the given $subject contains the provided $search"
topic: "collections"
signature: "contains(subject: array | string, search: any) -> boolean"
version: "latest"
---

## Description

Returns `true` if the given `$subject` contains the provided `$search`
value.

If `$subject` is an array, this function returns true if one of the elements
in the array is equal to the provided `$search` value.

If the provided `$subject` is a string, this function returns true if
there exists within the `$subject` string at least one occurrence
of an equal `$search` string. If the `$search` value is not a string,
the function MUST return `false`.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `subject` | `array, string` |  |
| `search` | `any` |  |


## Returns

**Type:** `boolean`

## Examples

```code
search(contains('foobar', 'foo'), null) -> true
```

```code
search(contains('foobar', 'not'), null) -> false
```

```code
search(contains('foobar', 'bar'), null) -> true
```

```code
search(contains(false, 'bar'), null) -> ERROR: invalid-type
```

```code
search(contains('foobar', '123'), null) -> false
```

```code
search(contains(@, 'a'), ["a","b"]) -> true
```

```code
search(contains(@, 'a'), ["a"]) -> true
```

```code
search(contains(@, 'b'), ["a"]) -> false
```

```code
search(contains(@, 'foo'), ["foo","bar"]) -> true
```

```code
search(contains(@, 'b'), ["foo","bar"]) -> false
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
| `contains('abc', 'a')` | `true` |
| `contains('abc', 'd')` | `false` |
| `contains(false, 'd')` | `ERROR: invalid-type` |
| `contains(strings, 'a')` | `true` |
| `contains(decimals, 1.2)` | `true` |
| `contains(decimals, false)` | `false` |

