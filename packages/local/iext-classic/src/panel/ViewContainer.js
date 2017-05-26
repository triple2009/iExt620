Ext.define('iExt.panel.ViewContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewcontainer',

    requires: [],

    layout: 'fit',
    cls: 'ix-view-container',
    bodyCls: 'ix-view-container-body',
    scrollable: 'y',

    // view:
    config: {
        ixList: undefined,
        ixCalendar: undefined,
        ixKanban: undefined,
        ixGraph: undefined,
        ixReport: undefined,

        ixAdd: undefined,
        ixEdit: undefined,
        ixDetail: undefined,
        ixLookup: undefined
    },

    initComponent: function () {
        var me = this;
        //    scale = me.getIxScale();
        // me.addCls('ix-app-title-' + scale);
        me.callParent();
    }

});