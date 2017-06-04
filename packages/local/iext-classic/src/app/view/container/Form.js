/**
 * @class iExt.app.view.container.Form
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 表单视图容器。
 */
Ext.define('iExt.app.view.container.Form', {
    extend: 'iExt.app.view.container.Base',
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