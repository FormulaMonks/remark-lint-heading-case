"use strict";

const strip = require("strip-markdown");
const { titleCase } = require("title-case");
const rule = require("unified-lint-rule");
const visit = require("unist-util-visit");

module.exports = rule("remark-lint:heading-case", function (
  tree,
  file,
  option
) {
  visit(tree, ["heading"], function (node) {
    const stripped = strip()(node);
    if (stripped.type !== "paragraph") return;
    if (stripped.children.length !== 1) return;
    const child = stripped.children[0];
    if (child.type !== "text") return;
    const text = child.value;
    const expected = titleCase(text);
    if (expected === text) return;
    file.message(
      "Consider title case: `" + expected + "`",
      node
    );
  });
});
