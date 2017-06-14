/**
 * @class iExt.panel.List
 * @extends {Ext.panel.Panel} 
 * @classdesc 自定义列表。
 */
Ext.define('iExt.panel.List', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixlistpanel',

    mixins: [
        'iExt.mixin.ListView'
    ],

    /**
     * 可配置主题
     * 可以在主题包中进行重载
     */
    ixTheme: {
        pageSize: 15
    },

    config: {
        /**
         * 列数
         */
        ixCols: 4,
        /**
         * 数据项模板
         */
        ixItemTpl: null
    },

    cls: 'ix-list-panel',
    bodyPadding: '5 5 5 5',
    scrollable: 'y',

    constructor: function (config) {
        var me = this;
        if (Ext.isEmpty(me.ixPageSize)) {
            me.ixPageSize = me.ixTheme.pageSize;
        }
        me.callParent();
    },

    initComponent: function () {
        var me = this,
            ixstore = me.getIxStore(),
            cols = me.getIxCols() || 1,
            tpl = me.getIxItemTpl() || [];

        ixstore = Ext.data.StoreManager.lookup(ixstore || 'ext-empty-store');

        if (me.ixPageSize > 0) {
            ixstore.pageSize = me.ixPageSize;
            if (me.bbar) {
                Ext.apply(me.bbar, {
                    ixStore: ixstore
                });
            } else {
                me.bbar = {
                    xtype: 'ixpagetbr',
                    ixStore: ixstore
                };
            }
        }

        var itemTpl = [],
            width = 100 / cols + '%';

        itemTpl = itemTpl.concat(
            '<div class="ix-list-item">',
            tpl, '</div>');

        var view = {
            xtype: 'dataview',
            trackOver: true,
            itemSelector: 'div.ix-list-item',
            overItemCls: 'ix-list-item-over',
            selectedItemCls: 'ix-list-item-selected',
            store: ixstore,
            itemTpl: itemTpl
        };
        me.items = [view];
        me.on('resize', me.ixOnResize, me);
        me.callParent(arguments);
    },

    ixOnResize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
        var me = this;
        var size = me.getSize(true);
        iExt.Toast.ixInfo(size.width + '-' + size.height);
        var elItems = me.getEl().query('div.ix-list-item', false);
        var width = width - 5 * 10;
        Ext.each(elItems, function (item) {
            item.setWidth(width / 4);
        });
    }

});