Ext.define('iExt.toolbar.Title', {
    extend: 'Ext.toolbar.TextItem',
    alias: 'widget.ixapptitle',

    requires: [],

    config: {
        ixScale: 'medium'
    },

    initComponent: function () {
        var me = this, scale = me.getIxScale();
        me.addCls('ix-app-title-' + scale);
        me.callParent();
    }

});
