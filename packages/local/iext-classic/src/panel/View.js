/**
 * @class iExt.panel.View
 * @extends {Ext.panel.Panel} 
 * @classdesc 自定义列表。
 * 该组件的主要应用场景是使 ixdataview 组件支持分页
 */
Ext.define('iExt.panel.View', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewpanel',

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
         * ixdataview 的配置项
         * 参见 iExt.view.View
         */
        ixViewConfig: null
    },

    cls: 'ix-view-panel',
    layout: 'fit',

    constructor: function (config) {
        var me = this;
        if (Ext.isEmpty(me.ixPageSize)) {
            me.ixPageSize = me.ixTheme.pageSize;
        }
        me.callParent();
    },

    initComponent: function () {
        var me = this,
            ixstore = me.getIxStore();

        me.minWidth = me.minWidth || me.ixTheme.minWidth;
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

        var view = {
            xtype: 'ixdataview',
            store: ixstore,
            listeners: {
                ixselection: {
                    fn: me.ixOnSelectionChange,
                    scope: me
                }
            }
        };
        var viewConfig = me.getIxViewConfig();
        if (viewConfig) {
            Ext.apply(view, viewConfig);
        }
        me.items = [view];
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

    /**
     * 执行搜索
     * @param {Object}  filters 搜索条件
     */
    ixSearch: function (filters) {
        var me = this,
            view = me.items.getAt(0);
        view.ixSearch(filters);
    }

});