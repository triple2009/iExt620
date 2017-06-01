/**
 * @class iExt.form.Header
 * @extends {Ext.toolbar.Toolbar} 
 * @classdesc 表单工具栏控件。
 */
Ext.define('iExt.form.Header', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixformheader',

    requires: [],

    ui: 'ix-form-header-ui',
    cls: 'ix-form-header',
    
    defaults: {
        scale: 'medium'
    }

});