Ext.define('app.view.odoo.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'app-odoo-list',

    requires: [
        'iExt.grid.column.Column'
    ],
    layout: 'fit',

    store: { type: 'user' },
    columns: [{
        text: '名称',
        xtype: 'ixcol',
        dataIndex: 'name',
        width: 120
    }, {
        text: 'Email',
        dataIndex: 'email',
        width: 200
    }, {
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }]

});