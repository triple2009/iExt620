Ext.define('app.view.main.AppMain', {
    extend: 'iExt.app.CardView',
    xtype: 'app-appmain',

    requires: [
        'iExt.meta.field.*',
        'app.meta.*'
    ],

    viewModel: 'appmain',
    
    ixHomeView: 'app-user',
    ixFormView: 'app-user-add',
    ixAppsStore: { type: 'apps' }

});