import { useState } from "react"


type Rule = 
{
    name: string;
    isActive: boolean;
}

export function Rules()
{
    const mock : Array<Rule>= 
    [
        { name: "www.testint.com", isActive: true },
        { name: "www.testint.com", isActive: true },
        { name: "www.testint.com", isActive: true },
        { name: "www.testint.com", isActive: true }
    ];

    const [list, setList] = useState(mock);

    const domList = list.map(r => <RuleRow rule={r}/>);
    return (
        <section>
            { domList }
        </section>
    )
}

interface RuleRowProps
{
    rule: Rule;
}

function RuleRow({rule}: RuleRowProps)
{
    return (<div>{rule.name}</div>);
}
