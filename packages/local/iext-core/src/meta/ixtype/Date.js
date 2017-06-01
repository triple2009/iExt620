Ext.define('iExt.meta.ixtype.Date', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: false,
    ixItems: [
        { name: 'DATE', text: '日期', value: 1 },
        { name: 'TIME', text: '时间', value: 2 },
        { name: 'DATETIME', text: '日期时间', value: 4 }
    ]
});