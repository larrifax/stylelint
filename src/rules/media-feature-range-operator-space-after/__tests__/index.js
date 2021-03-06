import {
  ruleTester,
  warningFreeBasics,
} from "../../../testUtils"
import rule, { ruleName, messages } from ".."

const testRule = ruleTester(rule, ruleName)

testRule("always", tr => {
  warningFreeBasics(tr)

  tr.ok("@media (max-width= 600px) {}")
  tr.ok("@media (max-width > 600px) {}")
  tr.ok("@media (max-width>= 600px) and (min-width<= 3em) {}")

  tr.notOk("@media (max-width<600px) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 19,
  })
  tr.notOk("@media (max-width<=  600px) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 20,
  })
  tr.notOk("@media (max-width=\t600px) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 19,
  })
  tr.notOk("@media (max-width>\n600px) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 19,
  })
  tr.notOk("@media (max-width>\r\n600px) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 19,
  }, "CRLF")
  tr.notOk("@media (max-width>=600px) and (min-width< 3em) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 20,
  })
  tr.notOk("@media (max-width> 600px) and (min-width=3em) {}", {
    message: messages.expectedAfter(),
    line: 1,
    column: 42,
  })
})

testRule("never", tr => {
  warningFreeBasics(tr)

  tr.ok("@media (max-width =600px) {}")
  tr.ok("@media (max-width>600px) {}")
  tr.ok("@media (max-width >=600px) and (min-width <=3em) {}")

  tr.notOk("@media (max-width < 600px) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 20,
  })
  tr.notOk("@media (max-width <=  600px) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 21,
  })
  tr.notOk("@media (max-width =\t600px) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 20,
  })
  tr.notOk("@media (max-width >\n600px) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 20,
  })
  tr.notOk("@media (max-width >\r\n600px) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 20,
  }, "CRLF")
  tr.notOk("@media (max-width >= 600px) and (min-width <3em) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 21,
  })
  tr.notOk("@media (max-width >600px) and (min-width = 3em) {}", {
    message: messages.rejectedAfter(),
    line: 1,
    column: 43,
  })
})
