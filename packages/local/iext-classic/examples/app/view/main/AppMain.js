Ext.define('app.view.main.AppMain', {
    extend: 'iExt.app.view.Tab',
    xtype: 'app-appmain',

    requires: [
        'iExt.meta.field.*',
        'app.meta.*',
        'iExt.*'
    ],

    viewModel: 'appmain',
    
    //ixHomeView: 'app-user',
    ixHomeView: 'app-user-kanban',
    ixAppsStore: { type: 'apps' }

});