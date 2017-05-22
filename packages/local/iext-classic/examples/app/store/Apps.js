Ext.define('app.store.Apps', {
    extend: 'Ext.data.Store',

    alias: 'store.apps',

    fields: [
        'code', 'name', 'icon'
    ],

    data: { items: [
        { code: 'hr', name: "人力资源管理", icon: "icon-1.png" },
        { code: 'oa', name: "办公自动化管理", icon: "icon-2.png" },
        { code: 'tc', name: "培训管理", icon: "icon-3.png" },
        { code: 'crm', name: "客户关系管理", icon: "icon-4.png" },
        { code: 'bz', name: "交易管理", icon: "icon-5.png" },
        { code: 'fin', name: "财务管理", icon: "icon-6.png" } 
    ]},

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'items'
        }
    }
});
