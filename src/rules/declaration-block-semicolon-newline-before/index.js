import {
  cssStatementBlockString,
  report,
  ruleMessages,
  validateOptions,
  whitespaceChecker,
} from "../../utils"

export const ruleName = "declaration-block-semicolon-newline-before"

export const messages = ruleMessages(ruleName, {
  expectedBefore: () => `Expected newline before ";"`,
  expectedBeforeMultiLine: () => `Expected newline before ";" in a multi-line rule`,
  rejectedBeforeMultiLine: () => `Unexpected whitespace before ";" in a multi-line rule`,
})

export default function (expectation) {
  const check = whitespaceChecker("newline", expectation, messages)
  return function (root, result) {
    const validOptions = validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        "always",
        "always-multi-line",
        "never-multi-line",
      ],
    })
    if (!validOptions) { return }

    root.walkDecls(function (decl) {
      const parentRule = decl.parent
      if (!parentRule.raw("semicolon") && parentRule.last === decl) { return }

      const declString = decl.toString()

      check.before({
        source: declString,
        index: declString.length,
        lineCheckStr: cssStatementBlockString(parentRule),
        err: m => {
          return report({
            message: m,
            node: decl,
            index: decl.toString().length - 1,
            result,
            ruleName,
          })
        },
      })
    })
  }
}
