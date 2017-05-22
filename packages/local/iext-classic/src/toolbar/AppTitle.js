Ext.define('iExt.toolbar.AppTitle', {
    extend: 'Ext.toolbar.TextItem',
    alias: 'widget.ixapptitle',

    requires: [],

    config: {
        ixScale: 'medium'
    },

    margin: '0 20 0 0',

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();
        me.addCls('ix-app-title-' + scale);
        me.callParent();
    }

});