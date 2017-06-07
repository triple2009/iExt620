/**
 * @class iExt.app.view.Workspace
 * @extends {Ext.container.Viewport} 
 * @classdesc 应用程序工作区。
 */
Ext.define('iExt.app.view.Workspace', {
    extend: 'Ext.container.Viewport',
    xtype: 'widget.ixappws',

    requires: [
        'iExt.app.Title'
    ],

    mixins: [
        'iExt.mixin.Workspace'
    ],

    viewModel: 'ixapp',
    controller: 'ixws',

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