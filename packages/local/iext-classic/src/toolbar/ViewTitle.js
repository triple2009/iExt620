Ext.define('iExt.toolbar.ViewTitle', {
    extend: 'Ext.toolbar.TextItem',
    alias: 'widget.ixviewtitle',

    requires: [],

    config: {
        ixScale: 'medium'
    },

    margin: '0 20 0 0',

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        me.addCls('ix-view-title-' + scale);
        me.callParent();
    }

});