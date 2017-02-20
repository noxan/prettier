"use strict";

var validate = require("jest-validate").validate;
var deprecatedConfig = require("./deprecated");

var defaults = {
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  trailingComma: "none",
  bracketSpacing: true,
  jsxBracketSameLine: false,
  parser: "babylon"
};

var exampleConfig = Object.assign({}, defaults, {
  filename: "testFilename",
  printWidth: 80,
  originalText: "text"
});

// Copy options and fill in default values.
function normalize(options) {
  if(typeof options.trailingComma === "boolean") {
    // Support a deprecated boolean type for the trailing comma config
    // for a few versions. This code can be removed later.
    options.trailingComma =  "es5";

    console.warn(
      "Warning: `trailingComma` without any argument is deprecated. " +
      'Specify "none", "es5", or "all".'
    );
  }

  validate(options, { exampleConfig, deprecatedConfig });
  const normalized = Object.assign({}, options || {});

  // For backward compatibility. Deprecated in 0.0.10
  if ("useFlowParser" in normalized) {
    normalized.parser = normalized.useFlowParser ? "flow" : "babylon";
    delete normalized.useFlowParser;
  }

  Object.keys(defaults).forEach(k => {
    if (normalized[k] == null) {
      normalized[k] = defaults[k];
    }
  });

  return normalized;
}

module.exports = { normalize };
