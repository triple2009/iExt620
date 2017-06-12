/**
 * @class iExt.app.view.window.Search
 * @extends {iExt.app.view.window.Base} 
 * @classdesc iExt 详细搜索视图窗口类。
 */
Ext.define('iExt.app.view.window.Search', {
    extend: 'iExt.app.view.window.Base',
    alias: 'widget.ixsearchwin',

    maximizable: false,
    minimizable: false,

    /**
     * 缺省标题
     */
    ixDefaultTitle: '详细搜索',

    privates: {

        _ixSetView: function () {
            var me = this;
            if ( me.__ixView) {
                if ( me.__ixView.ixIsFilterView !== true) {
                    Ext.raise('指定的视图不是搜索视图！');
                }
                 me.__ixView.on('ixvaliditychange', me._ixOnIxValidityChange, me);
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
                text: '搜索',
                iconCls: 'x-fa fa-search',
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
        _ixOnClear: function (item, e, eOpts) {
            var me = this;
            me.__ixView.ixClear();
        },

        /**
         * 搜索事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this;
            if (me.__ixView) {
                var eventName = me.__ixView.ixEventName || 'ixsearch';
                var filters = me.__ixView.ixGetFilters();
                var itemId = me.getIxEventItemId();
                // 获取搜索操作组件，触发 ixsearch 事件
                var cmp = Ext.getCmp(itemId);
                if (cmp) {
                    cmp.fireEvent(eventName, cmp, filters);
                }
            }
            me.close();
        }

    }

});