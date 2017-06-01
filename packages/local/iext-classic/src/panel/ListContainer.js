/**
 * @class iExt.panel.ListContainer
 * @extends {iExt.panel.ViewContainer} 
 * @classdesc 列表视图容器。
 */
Ext.define('iExt.panel.ListContainer', {
    extend: 'iExt.panel.ViewContainer',
    alias: 'widget.ixlistcontainer',

    requires: [],

    cls: 'ix-list-container',
    bodyCls: 'ix-list-container-body',
    ixDefaultTitle: '列表',

    // view:
    config: {
        ixList: undefined,
        ixCalendar: undefined,
        ixKanban: undefined,
        ixGraph: undefined,
        ixReport: undefined
    },

    initComponent: function () {
        var me = this;

        me.callParent();
    }

});