﻿/**
 * @mixin iExt.app.mixin.List
 * @classdesc iExt 列表视图 MIXIN。
 */
Ext.define('iExt.app.mixin.List', {
    extend: 'iExt.app.mixin.View',

    mixinConfig: {
        id: 'iext-view-list'
    },

    ixIsList: true,

    config: {
        /**
         * 缺省使用复选，如果不想使用选择器，
         * 可以设置为 undefined
         */
        ixMulti: true,
        /**
         * 
         */
        ixPageSize: 15,
        /**
         * 
         */
        ixStore: null,
        /**
         * 
         */
        ixFilters: null
    },

    /**
     * 数据选择事件。
     * @memberOf iExt.app.mixin.List#
     * @event ixselection
     * @param {iExt.app.mixin.List} this iExt.app.mixin.List控件。
     * @param {Object[]} data 当前选择的数据。
     */

    /**
     * 获取选择的数据
     */
    ixGetSelectedData: iExt.unimplFn,

    /**
     * 搜索数据
     */
    ixSearch: iExt.unimplFn,

    /**
     * 刷新数据
     */
    ixRefresh: iExt.unimplFn,

    statics: {

        // 获取列表视图的操作栏
        ixGetActionBar: function (service, model, actbar, userviewEnabled) {
            var tbar = {
                xtype: 'ix-actlist',
                ixService: service,
                ixModel: model ? model.$className : undefined
            };
            actbar = actbar || {};
            if (userviewEnabled === true) {
                // 创建用户自定义搜索和视图
                actbar.items = actbar.items || [];
                actbar.items.push('->');
                actbar.items.push({
                    xtype: 'combobox'
                });
                actbar.items.push({
                    xtype: 'button',
                    iconCls: 'x-fa fa-gear'
                });
            }
            Ext.apply(tbar, actbar);
            return tbar;
        }
    }

});