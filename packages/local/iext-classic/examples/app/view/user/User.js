Ext.define('app.view.user.User', {
    extend: 'iExt.app.view.container.List',
    xtype: 'app-user',

    requires: [
        'iExt.toolbar.Indexer',
        'iExt.form.field.TagLabel',
        'iExt.form.field.TagFilter',
        'iExt.meta.Types'
    ],
    controller: 'user',
    viewModel: 'user',
    title: '用户',

    ixDomain: 'app.domain.User',

    items: [{
        xtype: 'app-user-list',
        ixMulti: false,
        listeners: {
            selectionchange: 'onSelectionChange',
            itemdblclick: 'onItemClick'
        }

    }]

});