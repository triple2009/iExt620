Ext.define('app.view.main.AppMain', {
    extend: 'iExt.app.TabView',
    xtype: 'app-appmain',

    requires: [],
    
    ixHomeView: 'app-user',
    ixFormView: 'app-user-add',
    ixAppsStore: { type: 'apps' }

});