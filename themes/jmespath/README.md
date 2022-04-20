# JMESPath Site Theme

The theme provides two custom code blocks that can be included in markdown:

- jmespath: A code-block marked as `jmespath` with be converted to an interactive JMESPath editor with the first line of
  the code-block being the query and the remainder used as the input data. The result will be automatically calculated 
  by calling out to a locally running service during build. This service responds
  to requests to pre-execute any JMESPath code-blocks. See [build.sh](../../.github/workflows/build.sh) for an example of how
  this is set up.
- note: This is a simple block that displays as a specially formatted note within the page.

These are implemented in [./layouts/_default/_markup/render-codeblock*.html](./layouts/_default/_markup/).

Hugos default heading and link renderers are also overridden to allow rewriting the heading anchors and their links so 
that they do not collide between the spec and wiki content. These can also be found in [./layouts/_default/_markup/render-\[heading|link\].html](./layouts/_default/_markup/).

| Path | Description |
| ---- | ---- |
| `assets/demo.*` | Interactive JMESPath example implementation |
| `assets/main.scss` | Primary theme CSS document |
| `layouts/partials/*` | Reusable template elements referenced from layouts |
| `layouts/partials/function.html` | Renders a function given a data structure loaded from the function spec yml |
| `layouts/partials/grammar.html` | Content-less partial that returns the GRAMMAR with all `;;` comments removed |
| `layouts/partials/head.html` | Provides the head content for `layouts/_default/baseof.html` | 
| `layouts/partials/spec.html` | Renders GRAMMAR expressions with `;;` comments |
| `layouts/shortcodes/section.html` | Provides a simple section shortcode for use within markdown to wrap sections of content within the same document | 
| `layouts/index.html` | Placeholder main layout (overridden by project layout) |
