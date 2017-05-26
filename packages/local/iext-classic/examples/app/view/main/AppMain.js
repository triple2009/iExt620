Ext.define('app.view.main.AppMain', {
    extend: 'iExt.app.Card',
    xtype: 'app-appmain',

    requires: [],
    viewModel: 'appmain',

    ixHomeView: 'app-user',
    ixAppsStore: { type: 'apps' }

});