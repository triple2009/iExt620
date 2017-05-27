Ext.define('app.view.user.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'app-user-list',

    requires: [],
    layout: 'fit',

    store: { type: 'user' },
    columns: [{
        text: '名称',
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