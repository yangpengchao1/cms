export interface LeftSideMenu {
    icon?: JSX.Element;
    href: string;
    label: string;
    subMenu?: LeftSideMenu[];
    parentNodeLabel:string;
}