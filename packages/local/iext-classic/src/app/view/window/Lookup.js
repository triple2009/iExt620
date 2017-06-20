/**
 * @class iExt.app.view.window.Lookup
 * @extends {iExt.app.view.window.Base} 
 * @classdesc iExt 参照视图窗口类。
 */
Ext.define('iExt.app.view.window.Lookup', {
    extend: 'iExt.app.view.window.Base',
    alias: 'widget.ixlookupwin',

    maximizable: true,
    minimizable: false,
    bodyPadding: 0,

    /**
     * 缺省标题
     */
    title: '详细搜索',

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

    ixSetView: function () {
        var me = this;
        if (me.__ixCurrentView) {
            if (me.__ixCurrentView.ixIsListView !== true) {
                Ext.raise('指定的视图不是列表视图！');
            }
            me.__ixCurrentView.on('ixselection', me._ixOnIxSelection, me);
            me.__ixMulti = me.__ixCurrentView.getIxMulti();
        }
    },

    privates: {

        /**
         * 获取搜索的处理按钮
         */
        _ixGetButtons: function () {
            var me = this;
            return ['->', {
                xtype: 'button',
                text: '确定',
                iconCls: 'x-fa fa-check',
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
                        fn: me.ixOnCancel,
                        scope: me
                    }
                }
            }];
        },

        _ixOnIxSelection: function (sm, records) {
            var me = this,
                enable,
                refs = me.getReferences(),
                btnOk = refs.__btnOk;
            if (records && records.length > 0) {
                if (records.length > 1 && me.__ixMulti === false) {
                    enable = false;
                } else {
                    enable = true;
                }
            }
            btnOk.setDisabled(!enable);
        },

        /**
         * 搜索事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this;
            if (me.__ixCurrentView) {
                me.setIxReturn(me.__ixCurrentView.ixGetSelectedData());
            }
            me.close();
        }

    }

});