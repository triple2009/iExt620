/**
 * @class iExt.panel.FormContainer
 * @extends {iExt.panel.ViewContainer} 
 * @classdesc 表单视图容器。
 */
Ext.define('iExt.panel.FormContainer', {
    extend: 'iExt.panel.ViewContainer',
    alias: 'widget.ixformcontainer',

    requires: [],

    cls: 'ix-form-container',
    bodyCls: 'ix-form-container-body',

    layout: 'auto',   
    scrollable: 'y',
    ixDefaultTitle: '表单',

    // view:
    config: {
        ixForm: undefined
    },

    initComponent: function () {
        var me = this;

        me.callParent();
    }

});