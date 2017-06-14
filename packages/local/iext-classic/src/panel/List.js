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

        var itemTpl = [];
        itemTpl = itemTpl.concat(
            '<div class="ix-list-item" style="width:{[this.getItemWidth()]}px;">',
            tpl, '</div>', {
                getItemWidth: function () {
                    return me.__ixItemWidth;
                }
            });

        var view = {
            xtype: 'dataview',
            trackOver: true,
            itemSelector: 'div.ix-list-item',
            overItemCls: 'ix-list-item-over',
            selectedItemCls: 'ix-list-item-selected',
            store: ixstore,
            itemTpl: itemTpl
        };

        var multi = me.getIxMulti();
        if (multi !== undefined) {
            view.selectionModel = {
                type: 'dataviewmodel',
                mode: multi === true ? 'SIMPLE' : 'SINGLE',
                listeners: {
                    selectionchange: {
                        fn: me.ixOnSelectionChange,
                        scope: me
                    }
                }
            };
        }

        me.items = [view];
        me.on('resize', me.ixOnResize, me);
        me.callParent(arguments);
    },

    /**
     * 获取选择的数据
     */
    ixGetSelectedData: function () {
        var me = this,
            view = me.items.getAt(0);
        var data = view.getSelection();
        return data;
    },

    /**
     * 数据选择变更事件处理
     * 为了统一列表组件，触发自定义的事件
     */
    ixOnSelectionChange: function (sm, selections) {
        if (this.hasListeners.ixselection) {
            this.fireEvent('ixselection', this, selections);
        }
    },

    ixOnResize: function (panel, width, height, oldWidth, oldHeight, eOpts) {
        var me = this,
            bodyEl = me.body,
            cols = me.getIxCols();

        var size = bodyEl.getSize(true);
        //iExt.Toast.ixInfo(size.width + '-' + size.height);
        var itemWidth = size.width - (cols + 1) * 10;
        me.__ixItemWidth = itemWidth / cols;
        var elItems = me.getEl().query('div.ix-list-item', false);
        Ext.each(elItems, function (item) {
            item.setWidth(me.__ixItemWidth);
        });
    }

});