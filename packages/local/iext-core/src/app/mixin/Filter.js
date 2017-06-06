/**
 * @mixin iExt.app.mixin.Filter
 * @classdesc iExt 筛选条件 MIXIN。
 */
Ext.define('iExt.app.mixin.Filter', {
    extend: 'Ext.Mixin',

    requires: [
        'iExt.app.view.Util'
    ],

    mixinConfig: {
        id: 'iext-filter'
    },

    ixIsFilter: true,

    config: {
        /**
         * 筛选条件配置
         */
        ixFilters: null,

        /**
         * 对齐的目标控件引用标识
         * 表示对齐的控件reference
         */
        ixAlignTarget: null
    },

    /**
     * 设置自动搜索，例如text的回车事件处理
     */
    ixAutoSearch: true,

    applyIxFilters: function (filters) {
        if (filters) {
            filters = Ext.clone(filters);
            //filters = iExt.Filters.create(filters);
        }
        return filters;
    },

    ixOnQuickSearch: function (item, e, eOpts) {
        var me = this, ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            //filters = ixFilters.ixGetFilter(me.getReferences());
        }
        this.fireEvent('ixquicksearch', item, filters);
    },

    /**
     * 清除搜索条件事件处理。
     * @memberOf iExt.toolbar.Search#
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixOnClear: function (item, e, eOpts) {
        var me = this;
        iExt.app.view.Util.ixClearValues(me);
        if (me.ixAutoSearch === true) {
            me.ixOnQuickSearch(item, e, eOpts);
        }
    },

    /**
     * 开放此方法是为了可以由控件决定设置哪些子控件
     */
    ixSetAutoSearch: function (items) {
        var me = this;
        me._ixSetAutoQuickSearch(items);
    },

    privates: {

        /**
         * 设置自动快速搜索
         */
        _ixSetAutoQuickSearch: function (items) {
            var me = this;
            Ext.each(items, function (item) {
                if (!item.xtype || item.xtype === 'textfield' ||
                    item.xtype === 'ixtext') {
                    Ext.applyIf(item, {
                        enableKeyEvents: true,
                        listeners: {
                            keypress: { fn: me._ixOnKeyPress, scope: me }
                        }
                    });
                } else if (item.xtype === 'ixsearchbtn') {
                    Ext.applyIf(item, {
                        listeners: {
                            change: { fn: me._ixOnChange, scope: me }
                        }
                    });
                }
            });
        },

        /**
         * 回车自动搜索
         */
        _ixOnKeyPress: function (item, e, eOpts) {
            if (e.getCharCode() === Ext.EventObject.ENTER) {
                this.ixOnQuickSearch(item, null, e);
            }
        },

        /**
         * 搜索条件变更处理
         */
        _ixOnChange: function (item) {
            Ext.defer(this.ixOnQuickSearch, 100, this,
                [item, null, null]);
        }

    }

});