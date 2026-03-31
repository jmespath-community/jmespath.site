import { describe, it, expect } from "vitest";
import { parseSearchExpression } from "./parseSearchExpression";

describe("parseSearchExpression", () => {
	describe("Basic Expressions", () => {
		it("should parse simple identifier", () => {
			const result = parseSearchExpression(
				'search(foo, {"foo": "bar"}) -> "bar"',
			);
			expect(result).toBeDefined();
			expect(result?.expr).toBe("foo");
			expect(result?.input).toBe('{"foo": "bar"}');
			expect(result?.result).toBe('"bar"');
		});

		it("should parse dotted identifiers", () => {
			const result = parseSearchExpression(
				'search(foo.bar, {"foo": {"bar": "value"}}) -> "value"',
			);
			expect(result?.expr).toBe("foo.bar");
		});

		it("should handle null results", () => {
			const result = parseSearchExpression(
				'search(foo.bar, {"foo": {"baz": "value"}}) -> null',
			);
			expect(result?.result).toBe("null");
		});
	});

	describe("Pipe Expressions", () => {
		it("should parse pipe operator", () => {
			const result = parseSearchExpression(
				'search(foo | bar, {"foo": {"bar": "baz"}}) -> "baz"',
			);
			expect(result?.expr).toBe("foo | bar");
		});
	});

	describe("Logical OR", () => {
		it("should parse or expressions with string value", () => {
			const result = parseSearchExpression(
				'search(foo || bar, {"foo": "foo-value"}) -> "foo-value"',
			);
			expect(result?.expr).toBe("foo || bar");
		});

		it("should parse or expressions returning null", () => {
			const result = parseSearchExpression(
				'search(foo || bar, {"baz": "baz-value"}) -> null',
			);
			expect(result?.expr).toBe("foo || bar");
			expect(result?.result).toBe("null");
		});

		it("should parse triple or expressions", () => {
			const result = parseSearchExpression(
				'search(foo || bar || baz, {"baz": "baz-value"}) -> "baz-value"',
			);
			expect(result?.expr).toBe("foo || bar || baz");
		});
	});

	describe("Logical AND", () => {
		it("should parse and expressions with literal", () => {
			const result = parseSearchExpression(
				'search(True && False, {"True": true, "False": false}) -> false',
			);
			expect(result?.expr).toBe("True && False");
		});

		it("should parse and expressions with arrays", () => {
			const result = parseSearchExpression(
				'search(Number && EmptyList, {"Number": 5, "EmptyList": []}) -> []',
			);
			expect(result?.expr).toBe("Number && EmptyList");
			expect(result?.result).toBe("[]");
		});
	});

	describe("NOT Expressions", () => {
		it("should parse not expressions", () => {
			const result = parseSearchExpression(
				'search(!True, {"True": true}) -> false',
			);
			expect(result?.expr).toBe("!True");
		});

		it("should parse not with empty array", () => {
			const result = parseSearchExpression(
				'search(!EmptyList, {"EmptyList": []}) -> true',
			);
			expect(result?.expr).toBe("!EmptyList");
		});
	});

	describe("Arithmetic Expressions", () => {
		it("should parse addition", () => {
			const result = parseSearchExpression(
				'search(a + b, {"a": 1, "b": 2}) -> 3',
			);
			expect(result?.expr).toBe("a + b");
		});

		it("should parse subtraction", () => {
			const result = parseSearchExpression(
				'search(a - b, {"a": 1, "b": 2}) -> -1',
			);
			expect(result?.expr).toBe("a - b");
		});

		it("should parse multiplication", () => {
			const result = parseSearchExpression(
				'search(a * b, {"a": 2, "b": 4}) -> 8',
			);
			expect(result?.expr).toBe("a * b");
		});

		it("should parse division", () => {
			const result = parseSearchExpression(
				'search(a / b, {"a": 2, "b": 3}) -> 0.666666666666667',
			);
			expect(result?.expr).toBe("a / b");
		});

		it("should parse modulo", () => {
			const result = parseSearchExpression(
				'search(a % b, {"a": 10, "b": 3}) -> 1',
			);
			expect(result?.expr).toBe("a % b");
		});

		it("should parse integer division", () => {
			const result = parseSearchExpression(
				'search(a // b, {"a": 10, "b": 3}) -> 3',
			);
			expect(result?.expr).toBe("a // b");
		});

		it("should parse complex arithmetic", () => {
			const result = parseSearchExpression(
				'search(a.b + cd, {"a": {"b": 1}, "c": {"d": 2}}) -> 3',
			);
			expect(result?.expr).toBe("a.b + cd");
		});
	});

	describe("Index Expressions", () => {
		it("should parse index on array", () => {
			const result = parseSearchExpression(
				'search([0], ["first", "second", "third"]) -> "first"',
			);
			expect(result?.expr).toBe("[0]");
		});

		it("should parse negative index", () => {
			const result = parseSearchExpression(
				'search([-1], ["first", "second", "third"]) -> "third"',
			);
			expect(result?.expr).toBe("[-1]");
		});

		it("should parse out of bounds index", () => {
			const result = parseSearchExpression(
				'search([100], ["first", "second", "third"]) -> null',
			);
			expect(result?.expr).toBe("[100]");
			expect(result?.result).toBe("null");
		});

		it("should parse nested indexing", () => {
			const result = parseSearchExpression(
				'search(foo[0][0], {"foo": [[0, 1], [1, 2]]}) -> 0',
			);
			expect(result?.expr).toBe("foo[0][0]");
		});
	});

	describe("Slice Expressions", () => {
		it("should parse full slice notation", () => {
			const result = parseSearchExpression(
				"search([0:4:1], [0, 1, 2, 3]) -> [0, 1, 2, 3]",
			);
			expect(result?.expr).toBe("[0:4:1]");
		});

		it("should parse slice without step", () => {
			const result = parseSearchExpression(
				"search([0:4], [0, 1, 2, 3]) -> [0, 1, 2, 3]",
			);
			expect(result?.expr).toBe("[0:4]");
		});

		it("should parse slice with truncated range", () => {
			const result = parseSearchExpression(
				"search([0:3], [0, 1, 2, 3]) -> [0, 1, 2]",
			);
			expect(result?.expr).toBe("[0:3]");
		});

		it("should parse slice with only end", () => {
			const result = parseSearchExpression(
				"search([:2], [0, 1, 2, 3]) -> [0, 1]",
			);
			expect(result?.expr).toBe("[:2]");
		});

		it("should parse slice with only step", () => {
			const result = parseSearchExpression(
				"search([::2], [0, 1, 2, 3]) -> [0, 2]",
			);
			expect(result?.expr).toBe("[::2]");
		});

		it("should parse negative step", () => {
			const result = parseSearchExpression(
				"search([::-1], [0, 1, 2, 3]) -> [3, 2, 1, 0]",
			);
			expect(result?.expr).toBe("[::-1]");
		});

		it("should parse slice with negative start", () => {
			const result = parseSearchExpression(
				"search([-2:], [0, 1, 2, 3]) -> [2, 3]",
			);
			expect(result?.expr).toBe("[-2:]");
		});

		it("should parse slice on string with full range", () => {
			const result = parseSearchExpression(
				'search([::], "raw-string") -> "raw-string"',
			);
			expect(result?.expr).toBe("[::]");
		});

		it("should parse slice on string with step", () => {
			const result = parseSearchExpression(
				'search([::2], "raw-string") -> "rwsrn"',
			);
			expect(result?.expr).toBe("[::2]");
		});

		it("should parse reverse slice on string", () => {
			const result = parseSearchExpression(
				'search([::-1], "raw-string") -> "gnirts-war"',
			);
			expect(result?.expr).toBe("[::-1]");
		});
	});

	describe("MultiSelect List", () => {
		it("should parse multiselect list", () => {
			const result = parseSearchExpression(
				'search([foo,bar], {"foo": "a", "bar": "b", "baz": "c"}) -> ["a", "b"]',
			);
			expect(result?.expr).toBe("[foo,bar]");
			expect(result?.result).toBe('["a", "b"]');
		});

		it("should parse multiselect with index", () => {
			const result = parseSearchExpression(
				'search([foo,bar[0]], {"foo": "a", "bar": ["b"], "baz": "c"}) -> ["a", "b"]',
			);
			expect(result?.expr).toBe("[foo,bar[0]]");
		});

		it("should parse multiselect with dotted access", () => {
			const result = parseSearchExpression(
				'search([foo,bar.baz], {"foo": "a", "bar": {"baz": "b"}}) -> ["a", "b"]',
			);
			expect(result?.expr).toBe("[foo,bar.baz]");
		});

		it("should parse multiselect with null values", () => {
			const result = parseSearchExpression(
				'search([foo,baz], {"foo": "a", "bar": "b"}) -> ["a", null]',
			);
			expect(result?.expr).toBe("[foo,baz]");
			expect(result?.result).toBe('["a", null]');
		});
	});

	describe("MultiSelect Hash", () => {
		it("should parse multiselect hash", () => {
			const result = parseSearchExpression(
				'search({foo: foo, bar: bar}, {"foo": "a", "bar": "b", "baz": "c"}) -> {"foo": "a", "bar": "b"}',
			);
			expect(result?.expr).toBe("{foo: foo, bar: bar}");
		});

		it("should parse multiselect hash with array access", () => {
			const result = parseSearchExpression(
				'search({foo: foo, firstbar: bar[0]}, {"foo": "a", "bar": ["b"]}) -> {"foo": "a", "firstbar": "b"}',
			);
			expect(result?.expr).toBe("{foo: foo, firstbar: bar[0]}");
		});

		it("should parse multiselect hash with dotted key", () => {
			const result = parseSearchExpression(
				'search({foo: foo, "bar.baz": bar.baz}, {"foo": "a", "bar": {"baz": "b"}}) -> {"foo": "a", "bar.baz": "b"}',
			);
			expect(result?.expr).toBe('{foo: foo, "bar.baz": bar.baz}');
		});

		it("should parse multiselect hash with null values", () => {
			const result = parseSearchExpression(
				'search({foo: foo, baz: baz}, {"foo": "a", "bar": "b"}) -> {"foo": "a", "baz": null}',
			);
			expect(result?.expr).toBe("{foo: foo, baz: baz}");
		});

		it("should parse multiselect hash with backtick literal", () => {
			const result = parseSearchExpression(
				'search({first: a, type: `"mytype"`}, {"a": "b", "c": "d"}) -> {"first": "b", "type": "mytype"}',
			);
			expect(result?.expr).toBe('{first: a, type: `"mytype"`}');
		});
	});

	describe("Wildcard Projections", () => {
		it("should parse wildcard projection", () => {
			const result = parseSearchExpression(
				'search([*].foo, [{"foo": 1}, {"foo": 2}, {"foo": 3}]) -> [1, 2, 3]',
			);
			expect(result?.expr).toBe("[*].foo");
		});

		it("should parse wildcard with missing field", () => {
			const result = parseSearchExpression(
				'search([*].foo, [{"foo": 1}, {"foo": 2}, {"bar": 3}]) -> [1, 2]',
			);
			expect(result?.expr).toBe("[*].foo");
		});

		it("should parse wildcard on object", () => {
			const result = parseSearchExpression(
				'search(\'*.foo\', {"a": {"foo": 1}, "b": {"foo": 2}, "c": {"bar": 1}}) -> [1, 2]',
			);
			expect(result?.expr).toBe("'*.foo'");
		});
	});

	describe("Filter Expressions", () => {
		it("should parse filter with comparison", () => {
			const result = parseSearchExpression(
				'search(foo[?bar==`10`], {"foo": [{"bar": 1}, {"bar": 10}]}) -> [{"bar": 10}]',
			);
			expect(result?.expr).toBe("foo[?bar==`10`]");
		});

		it("should parse filter on array", () => {
			const result = parseSearchExpression(
				'search([?bar==`10`], [{"bar": 1}, {"bar": 10}]) -> [{"bar": 10}]',
			);
			expect(result?.expr).toBe("[?bar==`10`]");
		});

		it("should parse filter comparing fields", () => {
			const result = parseSearchExpression(
				'search(foo[?a==b], {"foo": [{"a": 1, "b": 2}, {"a": 2, "b": 2}]}) -> [{"a": 2, "b": 2}]',
			);
			expect(result?.expr).toBe("foo[?a==b]");
		});
	});

	describe("Function Calls", () => {
		it("should parse function with current node", () => {
			const result = parseSearchExpression(
				'search([].to_number(@), ["1", "2", "3", "notanumber", true]) -> [1, 2, 3]',
			);
			expect(result?.expr).toBe("[].to_number(@)");
		});
	});

	describe("Raw String Literals", () => {
		it("should parse backtick literal string", () => {
			const result = parseSearchExpression('search(`"foo"`, "") -> "foo"');
			expect(result?.expr).toBe(`\`"foo"\``);
			expect(result?.input).toBe('""');
		});

		it("should parse raw string with single quotes", () => {
			const result = parseSearchExpression('search(\'foo\', "") -> "foo"');
			expect(result?.expr).toBe("'foo'");
		});

		it("should parse raw string with spaces", () => {
			const result = parseSearchExpression('search(\' bar \', "") -> " bar "');
			expect(result?.expr).toBe("' bar '");
		});

		it("should parse raw string with brackets", () => {
			const result = parseSearchExpression('search(\'[baz]\', "") -> "[baz]"');
			expect(result?.expr).toBe("'[baz]'");
		});

		it("should parse raw string with escaped unicode", () => {
			const result = parseSearchExpression(
				'search(\'\\u03bB\', "") -> "\\\\u03bB"',
			);
			expect(result?.expr).toBe("'\\u03bB'");
		});

		it("should parse raw string with newline character", () => {
			const result = parseSearchExpression(
				'search(\'foo␊bar\', "") -> "foo\\nbar"',
			);
			expect(result?.expr).toBe("'foo␊bar'");
		});

		it("should parse raw string with escaped backslash", () => {
			const result = parseSearchExpression('search(\'\\\\\', "") -> "\\\\"');
			expect(result?.expr).toBe("'\\\\'");
		});
	});

	describe("Literal Expressions", () => {
		it("should parse backtick JSON string", () => {
			const result = parseSearchExpression(
				'search(`"foo"`, "anything") -> "foo"',
			);
			expect(result?.expr).toBe(`\`"foo"\``);
		});

		it("should parse backtick with escaped backtick", () => {
			const result = parseSearchExpression(
				'search(`"foo\\`bar"`, "anything") -> "foo`bar"',
			);
			expect(result?.expr).toBe('`"foo\\`bar"`');
		});

		it("should parse backtick JSON array", () => {
			const result = parseSearchExpression(
				'search(`[1, 2]`, "anything") -> [1, 2]',
			);
			expect(result?.expr).toBe("`[1, 2]`");
		});

		it("should parse backtick boolean", () => {
			const result = parseSearchExpression(
				'search(`true`, "anything") -> true',
			);
			expect(result?.expr).toBe("`true`");
		});

		it("should parse backtick object with projection", () => {
			const result = parseSearchExpression(
				'search(`{"a": "b"}`.a, "anything") -> "b"',
			);
			expect(result?.expr).toBe('`{"a": "b"}`.a');
		});
	});

	describe("Identifiers", () => {
		it("should parse simple identifier", () => {
			const result = parseSearchExpression(
				'search(foo, {"foo": "value"}) -> "value"',
			);
			expect(result?.expr).toBe("foo");
		});

		it("should parse null for missing identifier", () => {
			const result = parseSearchExpression(
				'search(bar, {"foo": "value"}) -> null',
			);
			expect(result?.expr).toBe("bar");
			expect(result?.result).toBe("null");
		});

		it("should parse identifier returning array", () => {
			const result = parseSearchExpression(
				'search(foo, {"foo": [0, 1, 2]}) -> [0, 1, 2]',
			);
			expect(result?.expr).toBe("foo");
		});

		it("should parse quoted identifier with space", () => {
			const result = parseSearchExpression(
				'search("with space", {"with space": "value"}) -> "value"',
			);
			expect(result?.expr).toBe('"with space"');
		});

		it("should parse quoted identifier with special chars", () => {
			const result = parseSearchExpression(
				'search("special chars: !@#", {"special chars: !@#": "value"}) -> "value"',
			);
			expect(result?.expr).toBe('"special chars: !@#"');
		});

		it("should parse quoted identifier with escaped quote", () => {
			const result = parseSearchExpression(
				'search("quote\\"char", {"quote\\"char": "value"}) -> "value"',
			);
			expect(result?.expr).toBe('"quote\\"char"');
		});

		it("should parse quoted identifier with unicode escape", () => {
			const result = parseSearchExpression(
				'search("\\u2713", {"\\u2713": "value"}) -> "value"',
			);
			expect(result?.expr).toBe('"\\u2713"');
		});
	});

	describe("Edge cases and special inputs", () => {
		it("should handle plain string input", () => {
			const result = parseSearchExpression(
				'search([::], "raw-string") -> "raw-string"',
			);
			expect(result?.input).toBe('"raw-string"');
		});

		it("should handle empty string input", () => {
			const result = parseSearchExpression('search(`"foo"`, "") -> "foo"');
			expect(result?.input).toBe('""');
		});

		it("should handle object input with escaped quotes", () => {
			const result = parseSearchExpression(
				'search("quote\\"char", {"quote\\"char": "value"}) -> "value"',
			);
			expect(result?.input).toBeDefined();
			expect(result?.input).toMatch(/quote/);
		});
	});

	describe("Simple format (without search wrapper)", () => {
		it("should parse simple expression format", () => {
			const result = parseSearchExpression('foo -> "bar"');
			expect(result?.expr).toBe("foo");
			expect(result?.input).toBeNull();
			expect(result?.result).toBe('"bar"');
		});

		it("should parse complex expression without search wrapper", () => {
			const result = parseSearchExpression("foo[*].bar | [0] -> [1, 2]");
			expect(result?.expr).toBe("foo[*].bar | [0]");
			expect(result?.input).toBeNull();
			expect(result?.result).toBe("[1, 2]");
		});

		it("should parse filter expression format", () => {
			const result = parseSearchExpression('foo[?bar==`10`] -> [{"bar": 10}]');
			expect(result?.expr).toBe("foo[?bar==`10`]");
			expect(result?.input).toBeNull();
		});

		it("should parse with null result", () => {
			const result = parseSearchExpression("missing -> null");
			expect(result?.expr).toBe("missing");
			expect(result?.input).toBeNull();
			expect(result?.result).toBe("null");
		});
	});

	describe("Assignment format (identifier = search(...))", () => {
		it("should parse assignment with simple expression", () => {
			const result = parseSearchExpression(
				'left-evaluation = search(foo, {"foo": {"bar": "baz"}}) -> {"bar": "baz"}',
			);
			expect(result?.expr).toBe("foo");
			expect(result?.input).toBe('{"foo": {"bar": "baz"}}');
			expect(result?.result).toBe('{"bar": "baz"}');
		});

		it("should parse assignment with nested search", () => {
			const result = parseSearchExpression(
				'result = search("bar", {"bar": "baz"}) -> "baz"',
			);
			expect(result?.expr).toBe('"bar"');
			expect(result?.input).toBe('{"bar": "baz"}');
			expect(result?.result).toBe('"baz"');
		});

		it("should handle assignment with complex expression", () => {
			const result = parseSearchExpression(
				'output = search(foo.bar | [0], [{"foo": {"bar": 1}}]) -> 1',
			);
			expect(result?.expr).toBe("foo.bar | [0]");
			expect(result?.input).toBe('[{"foo": {"bar": 1}}]');
			expect(result?.result).toBe("1");
		});

		it("should handle assignment with null result", () => {
			const result = parseSearchExpression(
				'result = search(missing, {"foo": "bar"}) -> null',
			);
			expect(result?.expr).toBe("missing");
			expect(result?.input).toBe('{"foo": "bar"}');
			expect(result?.result).toBe("null");
		});

		it("should handle assignment with underscore in identifier", () => {
			const result = parseSearchExpression(
				'my_var = search(foo, {"foo": "value"}) -> "value"',
			);
			expect(result?.expr).toBe("foo");
			expect(result?.input).toBe('{"foo": "value"}');
		});

		it("should handle assignment with multiple equals signs", () => {
			const result = parseSearchExpression(
				'result = search(a == b, {"a": "b"}) -> true',
			);
			expect(result?.expr).toBe("a == b");
			expect(result?.input).toBe('{"a": "b"}');
			expect(result?.result).toBe("true");
		});
	});

	describe("Multiline expressions", () => {
		it("should parse multiline search with json input spanning lines", () => {
			const multilineExpr = `search(foo[*].bar | [0], {
    "foo": [{"bar": ["first1", "second1"]},
            {"bar": ["first2", "second2"]}]
}) -> ["first1", "first2"]`;
			const result = parseSearchExpression(multilineExpr);
			expect(result?.expr).toBe("foo[*].bar | [0]");
			expect(result?.input).toBeDefined();
			expect(result?.input).toContain('"foo"');
			expect(result?.result).toBe('["first1", "first2"]');
		});

		it("should parse multiline search with filter expression spanning lines", () => {
			const multilineExpr = `search(foo[?a == \`1\` && b == \`2\`],
{"foo": [{"a": 1, "b": 2}, {"a": 1, "b": 3}]}) -> [{"a": 1, "b": 2}]`;
			const result = parseSearchExpression(multilineExpr);
			expect(result?.expr).toBe("foo[?a == `1` && b == `2`]");
			expect(result?.input).toBeDefined();
			expect(result?.result).toBe('[{"a": 1, "b": 2}]');
		});

		it("should parse multiline search with pipe and arrow on last line", () => {
			const multilineExpr = `search(foo | bar,
{"foo": {"bar": "value"}})
 -> "value"`;
			const result = parseSearchExpression(multilineExpr);
			expect(result?.expr).toBe("foo | bar");
			expect(result?.input).toBe('{"foo": {"bar": "value"}}');
			expect(result?.result).toBe('"value"');
		});

		it("should handle multiline with assignment", () => {
			const multilineExpr = `left-evaluation = search("foo",
{"foo": {"bar": "baz"}})
 -> {"bar": "baz"}`;
			const result = parseSearchExpression(multilineExpr);
			expect(result?.expr).toBe('"foo"');
			expect(result?.input).toBe('{"foo": {"bar": "baz"}}');
			expect(result?.result).toBe('{"bar": "baz"}');
		});

		it("should parse multiple separate expressions in concatenated form", () => {
			// This simulates what happens when two expressions are joined with newlines
			const firstExpr = `search("foo", {"foo": {"bar": "baz"}}) -> {"bar": "baz"}`;
			const secondExpr = `result = search("bar", {"bar": "baz"}) -> "baz"`;

			const result1 = parseSearchExpression(firstExpr);
			const result2 = parseSearchExpression(secondExpr);

			expect(result1?.expr).toBe('"foo"');
			expect(result1?.result).toBe('{"bar": "baz"}');

			expect(result2?.expr).toBe('"bar"');
			expect(result2?.result).toBe('"baz"');
		});

		it("should handle complex multiline with backticks and filter", () => {
			const multilineExpr = `search(foo[?type == \`"admin"\`],
{
    "foo": [
        {"type": "admin", "name": "Alice"},
        {"type": "user", "name": "Bob"}
    ]
})
 -> [{"type": "admin", "name": "Alice"}]`;
			const result = parseSearchExpression(multilineExpr);
			expect(result?.expr).toBe('foo[?type == `"admin"`]');
			expect(result?.input).toBeDefined();
			expect(result?.result).toBe('[{"type": "admin", "name": "Alice"}]');
		});
	});
});
