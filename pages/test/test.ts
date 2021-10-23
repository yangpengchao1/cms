import {SideNav} from "./SideNav";

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
                            { title: 'CIVIC', path: 'civic' }
                        ]
                    },
                    {
                        title: 'GUANGQI',
                        path: 'guangqi',
                        subNav: [{ title: 'AVANCIER', path: 'avancier' }, { title: 'ACCORD', path: 'accord' }]
                    }
                ]
            },
            {
                title: 'TOYOTA',
                path: 'toyota',
                subNav: [
                    { title: 'COROLLA', path: 'corolla' },
                    { title: 'CAMRY', path: 'camry' },
                    { title: 'PRADO', path: 'prado' },
                    { title: 'ALPHARD', path: 'alphard' }
                ]
            }
        ],
        path: 'car'
    },
    {
        title: 'Area',
        path: 'area',
        subNav: [
            {
                title: 'NORTH',
                path: 'north',
                subNav: [{ title: 'BEIJING', path: 'beijing' }, { title: 'CHANGCHU', path: 'changchu' }]
            },
            {
                title: 'SOUTH',
                path: 'south',
                subNav: [{ title: 'SHANGHAI', path: 'shanghai' }, { title: 'GUANGZHOU', path: 'guangzhou' }]
            }
        ]
    },
    {
        title: 'Country',
        path: 'country',
        subNav: [
            {
                title: 'CHINA',
                path: 'china',
                subNav: [{ title: 'MAINLAND', path: 'mainland' }, { title: 'TAIWAN', path: 'taiwan' }]
            },
            { title: 'American', path: 'american' }
        ]
    }
];

// title"CIVIC"=> { title: 'CIVIC', path: 'civic' }

function findObj(jsonObj:SideNav[],title:string){
    //先遍历第一层，如果有匹配，则return，如果没有匹配则去第二层开始匹配
}

// console.log(findObj(source,"CIVIC"))
console.log(11)