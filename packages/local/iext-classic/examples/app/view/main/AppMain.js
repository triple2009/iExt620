Ext.define('app.view.main.AppMain', {
    extend: 'iExt.app.view.TabView',
    xtype: 'app-appmain',

    requires: [
        'iExt.meta.field.*',
        'app.meta.*'
    ],

    viewModel: 'appmain',
    
    //ixHomeView: 'app-user',
    ixHomeView: 'mainlist',
    //ixFormView: 'app-user-add',
    ixAppsStore: { type: 'apps' }

});