/**
 * @class iExt.app.view.window.Search
 * @extends {iExt.app.view.window.Base} 
 * @classdesc iExt 搜索视图窗口类。
 */
Ext.define('iExt.app.view.window.Search', {
    extend: 'iExt.app.view.window.Base',
    alias: 'widget.ixsearchwin',

    privates: {

        _ixOnAfterRender: function () {
            var me = this;
            me.__btnOk = me.dockedItems.get(1).items.get(2);
            if (me.__ixView) {
                if (me.__ixView.ixIsSearch !== true) {

                }
                me.__ixView.on('ixvaliditychange', me._ixOnValidityChange, me);
            }
        },

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
                iconCls: 'x-fa fa-search',
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

        _ixOnValidityChange: function (item, valid) {
            var me = this,
                enable = valid;
            me.__btnOk.setDisabled(!enable);
        },

        /**
         * 清除窗口内容的事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnClear: function (item, e, eOpts) {
            iExt.view.Util.ixClearValues(this);
        },

        _ixOnOk: function (item, e, eOpts) {
            var me = this;
            if (me.__ixView) {
                var filters = me.__ixView.ixGetFilter();
                var userFilters = filters;
                if (me.__ixView.hasListeners.ixgetfilters) {
                    userFilters = me.__ixView.fireEvent('ixgetfilters',
                        me.__ixView, filters);
                }
                if (userFilters === false) {
                    return;
                } else if (Ext.isArray(userFilters)) {
                    // 事件可以进一步处理返回值
                    filters = userFilters;
                }
                me.setIxReturn(filters);
            }
            me.close();
        }

    }

});