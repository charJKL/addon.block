console.log("Hello World")

const rule = {id: 1, action: { type: "block" },  condition: {urlFilter: "pomofocus",  resourceTypes: ["main_frame", "sub_frame"]}};
const addRules = [rule];
const removeRuleIds = [1];
let rulesUpdated = browser.declarativeNetRequest.updateDynamicRules({addRules, removeRuleIds});

console.log(rulesUpdated);