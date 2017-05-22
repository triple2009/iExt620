Ext.define('iExt.panel.QuickView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixquickview',

    requires: [],

    cls: 'ix-quick-view',
    bodyCls: 'ix-quick-view-body',
    tbar: [{
        xtype: 'ixviewtitle',
        html: '快速查看'
    }, '->', {
        iconCls: 'x-fa fa-chevron-right',
        listeners: {
            click: function (item, e, opts) {
                item.up('panel').hide();
            }
        }
    }]

});