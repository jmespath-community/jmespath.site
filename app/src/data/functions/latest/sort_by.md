---
title: "sort_by"
description: "Sort an array using an expression expr as the sort key."
topic: "collections"
signature: "sort_by(elements: array, expr: expression->number | expression->string) -> array"
version: "latest"
---

## Description

Sort an array using an expression `expr` as the sort key.  For each element
in the array of `elements`, the `expr` expression is applied and the
resulting value is used as the key used when sorting the `elements`.

If the result of evaluating the `expr` against the current array element
results in type other than a `number` or a `string`, an `invalid-type` error will
occur.

Below are several examples using the `people` array (defined above) as the
given input.  `sort_by` follows the same sorting logic as the `sort`
function.


## Arguments

### Required

| Name | Type | Description |
|------|------|-------------|
| `elements` | `array` |  |
| `expr` | `expression->number, expression->string` |  |


## Returns

**Type:** `array`

## Examples

```code
search(sort_by(people, &age), {"people":[{"age":10,"order":"1"},{"age":10,"order":"2"},{"age":10,"order":"3"},{"age":10,"order":"4"},{"age":10,"order":"5"},{"age":10,"order":"6"},{"age":10,"order":"7"},{"age":10,"order":"8"},{"age":10,"order":"9"},{"age":10,"order":"10"},{"age":10,"order":"11"}]}) -> [{"age":10,"order":"1"},{"age":10,"order":"2"},{"age":10,"order":"3"},{"age":10,"order":"4"},{"age":10,"order":"5"},{"age":10,"order":"6"},{"age":10,"order":"7"},{"age":10,"order":"8"},{"age":10,"order":"9"},{"age":10,"order":"10"},{"age":10,"order":"11"}]
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
  ],
  "empty_list": []
}
```

| Expression | Result |
|------------|--------|
| `sort_by(people, &age)` | `[{"age":10,"age_str":"10","bool":true,"name":3},{"age":20,"age_str":"20","bool":true,"name":"a","extra":"foo"},{"age":30,"age_str":"30","bool":true,"name":"c"},{"age":40,"age_str":"40","bool":false,"name":"b","extra":"bar"},{"age":50,"age_str":"50","bool":false,"name":"d"}]` |
| `sort_by(people, &age_str)` | `[{"age":10,"age_str":"10","bool":true,"name":3},{"age":20,"age_str":"20","bool":true,"name":"a","extra":"foo"},{"age":30,"age_str":"30","bool":true,"name":"c"},{"age":40,"age_str":"40","bool":false,"name":"b","extra":"bar"},{"age":50,"age_str":"50","bool":false,"name":"d"}]` |
| `sort_by(people, &to_number(age_str))` | `[{"age":10,"age_str":"10","bool":true,"name":3},{"age":20,"age_str":"20","bool":true,"name":"a","extra":"foo"},{"age":30,"age_str":"30","bool":true,"name":"c"},{"age":40,"age_str":"40","bool":false,"name":"b","extra":"bar"},{"age":50,"age_str":"50","bool":false,"name":"d"}]` |
| `sort_by(people, &extra)` | `ERROR: invalid-type` |
| `sort_by(people, &bool)` | `ERROR: invalid-type` |
| `sort_by(people, &name)` | `ERROR: invalid-type` |
| `sort_by(people, name)` | `ERROR: invalid-type` |
| `sort_by(empty_list, &age)` | `[]` |

