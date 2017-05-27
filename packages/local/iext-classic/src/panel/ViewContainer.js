/**
 * @class iExt.panel.ViewContainer
 * @extends {Ext.panel.Panel} 
 * @classdesc 视图容器。
 */
Ext.define('iExt.panel.ViewContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewcontainer',

    requires: [],

    header: false,

    initComponent: function () {
        var me = this;
        //    scale = me.getIxScale();
        // me.addCls('ix-app-title-' + scale);
        me.callParent();
    }

});