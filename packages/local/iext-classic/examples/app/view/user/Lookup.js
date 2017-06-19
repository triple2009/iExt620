/**
 * This view is an example list of people.
 */
Ext.define('app.view.user.Lookup', {
    extend: 'iExt.grid.Panel',
    xtype: 'app-user-lookup',

    requires: [
        'app.store.User',
        'iExt.app.view.ListTypes'
    ],

    title: '用户参照',
    controller: {
        type: 'ixlist'
    },

    ixStore: {
        type: 'user'
    },
    //ixPageSize: 5,

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    }, {
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }]
});