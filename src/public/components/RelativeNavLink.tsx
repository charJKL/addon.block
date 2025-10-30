import { NavLink, NavLinkProps } from "react-router";

export function RelativeNavLink(props: NavLinkProps & React.RefAttributes<HTMLAnchorElement>)
{
    return <NavLink to={location.pathname + props.to} >{props.children}</NavLink>
}