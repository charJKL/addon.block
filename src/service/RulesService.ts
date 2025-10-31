


// Types:
export type UniqueIdString = string;
export type UniqueIdNumber = number;
export type Timestamp = number;
export type Rule = 
{
    id: UniqueIdString;
    netRequestId: UniqueIdNumber;
    addedTime: Timestamp;
    regexp: string;
}
export type RuleList = Array<Rule>;
export type RuleDesc = Pick<Rule, "regexp">;
export type RuleDescId = Pick<Rule, "id"> | Pick<Rule, "netRequestId"> | UniqueIdString;
export type RuleDeleted = { id: null, netRequestId: null }; // TODO base this on Rule type like others 

/**
 * IRulesService 
 */
interface IRulesService
{
    getRules(): RuleList;
    addRule(ruleDesc: RuleDesc) : Rule;
    removeRule(ruleDescId: RuleDescId): RuleDeleted;
}

export class RulesService implements IRulesService
{
    
    getRules() : RuleList 
    {
        // TODO query local storage for rules 
        return [];
    }
    
    addRule(ruleDesc: RuleDesc) : Rule
    {
        // TODO Add to database
        // TODO Add to netRequest
        const rule = { id: "", netRequestId: 0, addedTime: 0, regexp: ruleDesc.regexp }; 
        return rule;
    }

    removeRule(ruleDescId: RuleDescId ): RuleDeleted
    {
        const rule = { id: null, netRequestId: null, addedTime: 0, regexp: ""}; 
        return rule;
    }

}