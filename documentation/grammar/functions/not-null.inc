.. _not_null:

not_null
--------

::

    any not_null([any $argument [, any $...]])

Returns the first argument that does not resolve to ``null``.  This function
accepts one or more arguments, and will evaluate them in order until a
non null argument is encounted.  If all arguments values resolve to ``null``,
then a value of ``null`` is returned.

.. cssclass:: table

.. list-table:: Examples
  :header-rows: 1

  * - Given
    - Expression
    - Result
  * - ``{"a": null, "b": null, "c": [], "d": "foo"}``
    - ``not_null(no_exist, a, b, c, d)``
    - ``[]``
  * - ``{"a": null, "b": null, "c": [], "d": "foo"}``
    - ``not_null(a, b, `null`, d, c)``
    - ``"foo"``
  * - ``{"a": null, "b": null, "c": [], "d": "foo"}``
    - ``not_null(a, b)``
    - ``null``


