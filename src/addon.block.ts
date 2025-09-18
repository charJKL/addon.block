console.log("Hello World")
//import {Rule} from "@typ/plugin-typescript";

type NetRequestRule = browser.declarativeNetRequest.Rule;

const rule : NetRequestRule = {id: 1, action: { type: "block" },  condition: {urlFilter: "pomofocus",  resourceTypes: ["main_frame", "sub_frame"]}};
const addRules : NetRequestRule[] = [rule];
const removeRuleIds = [1];
let rulesUpdated = browser.declarativeNetRequest.updateDynamicRules({addRules, removeRuleIds});

console.log(rulesUpdated);


browser.tabs.create({url: "/public/settings.html"});



browser.runtime.onMessage.addListener(function(message, sender){
    console.log("message from frontpage", message, sender);
});





