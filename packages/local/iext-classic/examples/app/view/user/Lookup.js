/**
 * This view is an example list of people.
 */
Ext.define('app.view.user.Lookup', {
    extend: 'iExt.grid.Lookup',
    xtype: 'app-user-lookup',

    requires: [
        'app.store.User',
        'iExt.app.view.ListTypes'
    ],

    title: '用户参照',
    //header: false,
    controller: {
        type: 'ixlist'
    },

    tbar: [{
        xtype: 'ixtagsearch',
        ixView: 'app-user-search',
        flex: 1
    }],

    ixStore: {
        type: 'user'
    },
    ixPageSize: 5,

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    }]
});