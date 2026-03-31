---
title: "abs"
description: "Returns the absolute value of the provided argument."
topic: "math"
signature: "abs(value: number) -> number"
version: "2015-09-05-9e8d0e3"
---

## Description

Returns the absolute value of the provided argument.  The signature indicates
that a number is returned, and that the input argument `$value` **must**
resolve to a number, otherwise a `invalid-type` error is triggered.

Below is a worked example.  Given:

```json
{
  "foo": -1,
  "bar": "2"
}
```

Evaluating `abs(foo)` works as follows:

1. Evaluate the input argument against the current data:

```code
search(foo, {"foo": -1, "bar": "2"}) -> -1
```

1. Validate the type of the resolved argument.  In this case
`-1` is of type `number` so it passes the type check.

2. Call the function with the resolved argument:

```code
abs(-1) -> 1
```

1. The value of `1` is the resolved value of the function expression
`abs(foo)`.

Below is the same steps for evaluating `abs(bar)`:

1. Evaluate the input argument against the current data:

```code
search(bar, {"foo": -1, "bar": "2"}) -> "2"
```

1. Validate the type of the resolved argument.  In this case
`"2"` is of type `string` so we immediately indicate that
an `invalid-type` error occurred.

As a final example, here is the steps for evaluating `abs(to_number(bar))`:

1. Evaluate the input argument against the current data:

```code
search(to_number(bar), {"foo": -1, "bar": "2"}) -> "…"
```

1. In order to evaluate the above expression, we need to evaluate
`to_number(bar)`:

```code
search(bar, {"foo": -1, "bar": "2"}) -> "2"
# Validate "2" passes the type check for to_number, which it does.
to_number("2") -> 2
```

See [`to_number`](/functions/2015-09-05-9e8d0e3/to_number/) for its definition.

1. Now we can evaluate the original expression:

```code
search(to_number(bar), {"foo": -1, "bar": "2"}) -> 2
```

1. Call the function with the final resolved value:

```code
abs(2) -> 2
```

1. The value of `2` is the resolved value of the function expression
`abs(to_number(bar))`.

## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `value` | `number` | positive or negative number |

## Returns

**Type:** `number`

positive magnitude of input value

## Examples

```code
search(abs(1), null) -> 1
```

```code
search(abs(-1), null) -> 1
```

```code
search(abs(abc), null) -> ERROR: invalid-type
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
| `abs(foo)` | `1` |
| `abs(str)` | `ERROR: invalid-type` |
| `abs(array[1])` | `3` |
| `abs(false)` | `ERROR: invalid-type` |
| `abs(-24)` | `24` |
| `abs(1, 2)` | `ERROR: invalid-arity` |
| `abs()` | `ERROR: invalid-arity` |
