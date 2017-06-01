Ext.define('iExt.meta.Types', {
    extend: 'iExt.enums.Base',
    singleton: true,

    ixBit: true,
    
    ixItems: [
        { name: 'STRING', text: '字符', value: 1 },
        { name: 'BOOLEAN', text: '布尔', value: 2 },
        { name: 'INTEGER', text: '整型', value: 4 },
        { name: 'NUMBER', text: '数字', value: 8 },
        { name: 'DATE', text: '日期', value: 16 }
    ]
    
});