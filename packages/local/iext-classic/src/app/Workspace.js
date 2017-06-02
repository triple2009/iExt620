/**
 * @class iExt.app.Workspace
 * @extends {Ext.container.Viewport} 
 * @classdesc 应用程序工作区。
 */
Ext.define('iExt.app.Workspace', {
    extend: 'Ext.container.Viewport',
    xtype: 'widget.ixappws',

    requires: [
        'iExt.app.Title'
    ],

    mixins: [
        'iExt.app.view.Workspace'
    ],

    viewModel: 'ixapp',

    layout: 'border',
    referenceHolder: true,

    config: {
        ixHeaderItems: [],
        ixHomeView: undefined,
        ixFormView: undefined,
        ixAppsStore: undefined
    },

    initComponent: function () {
        var me = this;


        me.callParent(arguments);
    }

});