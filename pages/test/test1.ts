export interface SideNav {
    title: string;
    path: string;
    subNav?: SideNav[];
}

const source: SideNav[] = [
    {
        title: 'Car',
        subNav: [
            {
                title: 'HONDA',
                path: 'honda',
                subNav: [
                    {
                        title: 'DONGFENG',
                        path: 'dongfeng',
                        subNav: [
                            { title: 'NSPIRE', path: 'nspire' },
                            { title: 'ENVIX', path: 'envix' },
                            { title: 'CIVIC', path: 'civic' },
                        ],
                    },
                    {
                        title: 'GUANGQI',
                        path: 'guangqi',
                        subNav: [
                            { title: 'AVANCIER', path: 'avancier' },
                            { title: 'ACCORD', path: 'accord' },
                        ],
                    },
                ],
            },
            {
                title: 'TOYOTA',
                path: 'toyota',
                subNav: [
                    { title: 'COROLLA', path: 'corolla' },
                    { title: 'CAMRY', path: 'camry' },
                    { title: 'PRADO', path: 'prado' },
                    { title: 'ALPHARD', path: 'alphard' },
                ],
            },
        ],
        path: 'car',
    },
    {
        title: 'Area',
        path: 'area',
        subNav: [
            {
                title: 'NORTH',
                path: 'north',
                subNav: [
                    { title: 'BEIJING', path: 'beijing' },
                    { title: 'CHANGCHU', path: 'changchu' },
                ],
            },
            {
                title: 'SOUTH',
                path: 'south',
                subNav: [
                    { title: 'SHANGHAI', path: 'shanghai' },
                    { title: 'GUANGZHOU', path: 'guangzhou' },
                ],
            },
        ],
    },
    {
        title: 'Country',
        path: 'country',
        subNav: [
            {
                title: 'CHINA',
                path: 'china',
                subNav: [
                    { title: 'MAINLAND', path: 'mainland' },
                    { title: 'TAIWAN', path: 'taiwan' },
                ],
            },
            { title: 'American', path: 'american' },
        ],
    },
];

let result = null;
let num = 1;
const findNode = (nodeTree: SideNav[], title: string) => {
    //遍历树
    nodeTree.find((node: SideNav) => {
        console.log(`第${num++}次查找:${node.title}`);
        if (node.title == title) {
            result = node;
        }
        if (node.subNav && result == null) {
            findNode(node.subNav, title);
        }
    });
    return result;
};

console.log(findNode(source, 'CIVIC'));
