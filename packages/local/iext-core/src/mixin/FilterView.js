/**
 * @mixin iExt.mixin.FilterView
 * @extends {iExt.mixin.View} 
 * @classdesc iExt 筛选条件 MIXIN。
 * 该视图只用于定义删选条件，并不执行实际的搜索。
 */
Ext.define('iExt.mixin.FilterView', {
    extend: 'iExt.mixin.View',

    requires: [
        'iExt.app.view.Util'
    ],

    mixinConfig: {
        id: 'iext-view-filter'
    },

    ixIsFilterView: true,

    config: {
        /**
         * 筛选条件配置
         */
        ixFilters: null
    },

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
     * 清除搜索条件事件处理。
     * @memberOf iExt.mixin.FilterView#
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixClear: function (item, e, eOpts) {
        var me = this;
        iExt.View.ixClearValues(me);
    },

    ixGetFilters: function () {
        var me = this,
            ixFilters = me.getIxFilters();
        var filters = [];
        if (ixFilters) {
            filters = ixFilters.ixGetFilter(me.getReferences());
        }
        return filters;
    }

});