/**
 * @class iExt.view.Header
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 视图工具栏控件。
 */
Ext.define('iExt.view.Header', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixviewheader',

    requires: [],

    ui: 'ix-view-header-ui',
    cls: 'ix-view-header',

    defaults: {
        scale: 'small'
    }

});