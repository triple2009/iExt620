/**
 * @mixin iExt.mixin.SearchView
 * @extends {iExt.mixin.View} 
 * @classdesc iExt 搜索 MIXIN。
 */
Ext.define('iExt.mixin.SearchView', {
    extend: 'iExt.mixin.View',

    requires: [
        'iExt.app.view.Util'
    ],

    mixinConfig: {
        id: 'iext-view-search'
    },

    ixIsSearch: true,

    config: {
        /**
         * 筛选条件配置
         */
        ixFilters: null
    },

    /**
     * 对于文本框等回车触发搜索的情况
     * 需要传递实际的搜索按钮组件
     * 通过该属性来设置需要触发的实际组件
     */
    ixEventItem: null,

    /**
     * 事件名称：ixsearch / ixquicksearch
     * 缺省使用：ixsearch
     */
    ixEventName: 'ixsearch',

    applyIxFilters: function (filters) {
        if (filters) {
            filters = Ext.clone(filters);
            filters = iExt.Filters.create(filters);
        }
        return filters;
    },

    /**
     * 获取是否合法信息
     */
    ixIsValid: iExt.unimplFn,

    /**
     * 触发搜索事件
     */
    ixOnSearch: function (item, e, eOpts) {
        var me = this,
            ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            filters = ixFilters.ixGetFilter(me.getReferences());
        }
        // 触发搜索事件
        // 列表的视图控制器会监听该事件，并进行相应的处理
        this.fireEvent(me.ixEventName || 'ixsearch', me.ixEventItem || item, filters);
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
        iExt.View.ixClearValues(me);
    },

    /**
     * 析构视图处理。
     */
    ixOnDestroy: function () {
        Ext.destroyMembers(this, 'ixEventItem');
        this.callParent(arguments);
    },

    /**
     * 
     */
    ixOnAfterRender: function () {
        var me = this;
        var valid = me.ixIsValid();
        me.on('validitychange', me._ixOnValidityChange, me);
        me._ixOnValidityChange(me, valid);
        me.callParent(arguments);
    },

    privates: {

        /**
         * 校验变化事件处理
         * @memberOf iExt.app.view.Search#
         * @param {Ext.Component} item 触发事件的控件。
         * @param {Boolean} valid 是否有效。
         */
        _ixOnValidityChange: function (item, valid) {
            if (this.hasListeners.ixvaliditychange) {
                this.fireEvent('ixvaliditychange', this, valid);
            }
        }

    }

});