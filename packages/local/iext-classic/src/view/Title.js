/**
 * @class iExt.view.Title
 * @extends {Ext.toolbar.TextItem} 
 * @classdesc 视图标题控件，对于只有标题的工具栏，高度会有影响。
 */
Ext.define('iExt.view.Title', {
    extend: 'Ext.toolbar.TextItem',
    alias: 'widget.ixviewtitle',

    requires: [],

    config: {
        ixScale: 'medium'
    },

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        me.addCls('ix-view-title-' + scale);
        me.callParent();
    }

});