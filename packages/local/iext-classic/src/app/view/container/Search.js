/**
 * @class iExt.app.view.container.Search
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 搜索视图容器。
 */
Ext.define('iExt.app.view.container.Search', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixsearchcontainer',

    requires: [],

    layout: 'auto',
    scrollable: 'y',
    title: '搜索',
    bodyPadding: '0 5 0 5',

    /**
     * 视图类型
     */
    ixViewType: 'search',

    /**
     * TagSearch 同步删除条件
     * 删除搜索条件
     * @param {Object} filters 搜索条件
     */
    ixRemoveFilter: function (filter) {
        var me = this;
        if (me.__ixView) {
            return me.__ixView.ixRemoveFilter(filter);
        }
    },

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: function () {
        var me = this;
        me.fbar = {
            xtype: 'toolbar',
            items: me._ixGetButtons()
        };
    },

    /**
     * 设置当前视图
     */
    ixSetView: function () {
        var me = this;
        if (me.__ixCurrentView) {
            if (me.__ixCurrentView.ixIsFilterView !== true) {
                Ext.raise('指定的视图不是搜索视图！');
            }
            me.__ixCurrentView.on('ixvaliditychange', me._ixOnIxValidityChange, me);
        }
    },

    privates: {

        /**
         * 获取搜索的处理按钮
         */
        _ixGetButtons: function () {
            var me = this;
            return [{
                text: '清空',
                iconCls: 'x-fa fa-clipboard',
                listeners: {
                    click: {
                        fn: me._ixOnClear,
                        scope: me
                    }
                }
            }, '->', {
                xtype: 'button',
                text: '确定',
                iconCls: 'x-fa fa-filter',
                reference: '__btnOk',
                listeners: {
                    click: {
                        fn: me._ixOnOk,
                        scope: me
                    }
                }
            }, {
                xtype: 'button',
                text: '取消',
                iconCls: 'x-fa fa-close',
                listeners: {
                    click: {
                        fn: me._ixOnCancel,
                        scope: me
                    }
                }
            }];
        },

        _ixOnIxValidityChange: function (item, valid) {
            var me = this,
                enable = valid,
                refs = me.getReferences();
            var btnOk = refs.__btnOk;
            btnOk.setDisabled(!enable);
        },

        /**
         * 清除窗口内容的事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnCancel: function (item, e, eOpts) {
            var me = this;
            me.fireEvent('ixclose', me, null);
        },

        /**
         * 清除窗口内容的事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnClear: function (item, e, eOpts) {
            var me = this;
            me.__ixCurrentView.ixClear();
        },

        /**
         * 搜索事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this,
                filters = null;
            if (me.__ixCurrentView) {
                filters = me.__ixCurrentView.ixGetFilters();
            }
            me.fireEvent('ixclose', me, filters);
        }

    }

});