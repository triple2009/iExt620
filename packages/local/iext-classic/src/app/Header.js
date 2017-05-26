/**
 * @class iExt.app.Header
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 应用程序的工具栏。
 */
Ext.define('iExt.app.Header', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixappheader',

    requires: [],

    ui: 'ix-app-header-ui',
    cls: 'ix-app-header',

    defaults: {
        ui: 'ix-app-btn-ui',
        scale: 'medium'
    }

});