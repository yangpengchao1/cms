export interface SideNav {
    title: string;
    path: string;
    subNav?: SideNav[];
}