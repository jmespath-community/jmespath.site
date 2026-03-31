---
title: "min_by"
description: "Return the minimum element in an array using the expression expr as the"
topic: "math"
signature: "min_by(elements: array, expr: expression->number | expression->string) -> any"
version: "2015-09-05-9e8d0e3"
---

## Description

Return the minimum element in an array using the expression `expr` as the
comparison key.  The entire maximum element is returned.
Below are several examples using the `people` array (defined above) as the
given input.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `elements` | `array` |  |
| `expr` | `expression->number, expression->string` |  |


## Returns

**Type:** `any`

## Examples

```code
search(min_by(people, &age), null) -> {"age":10,"age_str":"10","bool":true,"name":3}
```

```code
search(min_by(people, &age), null) -> 10
```

```code
search(min_by(people, &to_number(age_str)), null) -> {"age":10,"age_str":"10","bool":true,"name":3}
```

```code
search(min_by(people, &age_str), null) -> ERROR: invalid-type
```

```code
search(min_by(people, age), null) -> ERROR: invalid-type
```

Given the following JSON input:

```json
{
  "people": [
    {
      "age": 20,
      "age_str": "20",
      "bool": true,
      "name": "a",
      "extra": "foo"
    },
    {
      "age": 40,
      "age_str": "40",
      "bool": false,
      "name": "b",
      "extra": "bar"
    },
    {
      "age": 30,
      "age_str": "30",
      "bool": true,
      "name": "c"
    },
    {
      "age": 50,
      "age_str": "50",
      "bool": false,
      "name": "d"
    },
    {
      "age": 10,
      "age_str": "10",
      "bool": true,
      "name": 3
    }
  ]
}
```

| Expression | Result |
|------------|--------|
| `min_by(people, &age)` | `{"age":10,"age_str":"10","bool":true,"name":3}` |
| `min_by(people, &age_str)` | `{"age":10,"age_str":"10","bool":true,"name":3}` |
| `min_by(people, &bool)` | `ERROR: invalid-type` |
| `min_by(people, &extra)` | `ERROR: invalid-type` |
| `min_by(people, &to_number(age_str))` | `{"age":10,"age_str":"10","bool":true,"name":3}` |

