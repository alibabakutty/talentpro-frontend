const Links = [
    {
        name: 'Home',
    },
    {
        name: 'Master',
        submenu: true,
        subLinks: [
            { name: 'Ledger', link: '/menu/ledger' },
            { name: 'Voucher Type', link: '/menu/voucherType' },
        ],
    },
    {
        name: 'Services',
        submenu: true,
        subLinks: [],
    },
    {
        name: 'Contact',
        submenu: true,
        subLinks: [],
    }
];

export default Links;