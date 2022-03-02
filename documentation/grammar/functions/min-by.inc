.. _func-min-by:

min_by
------

::

    min_by(array elements, expression->number|expression->string expr)

Return the minimum element in an array using the expression ``expr`` as the
comparison key.  The entire maximum element is returned.
Below are several examples using the ``people`` array (defined above) as the
given input.


.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Expression
    - Result
  * - ``min_by(people, &age)``
    - ``{"age": 10, "age_str": "10", "bool": true, "name": 3}``
  * - ``min_by(people, &age).age``
    - ``10``
  * - ``min_by(people, &to_number(age_str))``
    - ``{"age": 10, "age_str": "10", "bool": true, "name": 3}``
  * - ``min_by(people, &age_str)``
    - ``<error: invalid-type>``
  * - ``min_by(people, age)``
    - ``<error: invalid-type>``
