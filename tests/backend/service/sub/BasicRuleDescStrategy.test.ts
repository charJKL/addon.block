import { expect, test } from '@rstest/core';
import { BasicRuleDescStrategy } from "@/backend/service/sub/BasicRuleDescStrategy";

const data =
[
	{ ruleDesc: {simplified: "www.onet.pl"}, simplified: "www.onet.pl", regexp: "(http|https)://www\\.onet\\.pl"},
	{ ruleDesc: {simplified: "onet.pl" }, simplified: "onet.pl", regexp: "(http|https)://(www\\.)?onet\\.pl"},
	{ ruleDesc: {simplified: "http://www.onet.pl" }, simplified: "http://www.onet.pl", regexp: "http://www\\.onet\\.pl"},
	{ ruleDesc: {simplified: "https://onet.pl" }, simplified: "https://onet.pl", regexp: "https://(www\\.)?onet\\.pl"},
	{ ruleDesc: {simplified: "https:onet.pl" }, simplified: "https:onet.pl", regexp: "https://(www\\.)?onet\\.pl"},
	{ ruleDesc: {simplified: "www.ackme.eu.com/product=1"}, simplified:"www.ackme.eu.com/product=1", regexp: "(http|https)://www\\.ackme\\.eu\\.com/product=1" },
	{ ruleDesc: {simplified: "www.ackme.eu.com/board/*product=1*"}, simplified:"www.ackme.eu.com/board/*product=1*", regexp: "(http|https)://www\\.ackme\\.eu\\.com/board/.*product=1.*" },
	{ ruleDesc: {regexp: "www.onet.pl"}, simplified: "", regexp: "www.onet.pl"},
];
test.each(data)("`BasicRuleDescStrategy` properly resolve patterns", function({ruleDesc, simplified, regexp}){
	const ruleDescBuilder = new BasicRuleDescStrategy();

	const result = ruleDescBuilder.buildRuleDesc(ruleDesc);
	
	expect(result.simplified).toBe(simplified);
	expect(result.regexp).toBe(regexp);
});