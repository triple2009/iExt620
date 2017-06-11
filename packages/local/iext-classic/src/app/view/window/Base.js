/**
 * @class iExt.app.view.window.Base
 * @extends {iExt.window.Window} 
 * @classdesc iExt 视图窗口基础类。
 */
Ext.define('iExt.app.view.window.Base', {
    extend: 'iExt.window.Window',
    alias: 'widget.ixviewwin',

    config: {
        /**
         * 视图类名称或视图组件配置或组件
         * {String|Object|Component}
         */
        ixView: null,

        /**
         * 返回的数据
         */
        ixReturn: null,

        /**
         * 是否检查脏数据
         */
        ixDirtyCheck: false
    },

    initComponent: function () {
        var me = this;
        me.buttons = me._ixGetButtons();
        me.on('beforeclose', me._ixOnBeforeClose, me);
        me.callParent(arguments);
    },

    /**
     * 获取缺省视图
     * 添加渲染事件处理
     */
    afterRender: function () {
        var me = this;
        me.__ixView = me.items.getAt(0);
        me._ixOnAfterRender();
        me.callParent(arguments);
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '__ixView');
    },

    privates: {

        /**
         * 渲染事件处理
         */
        _ixOnAfterRender: function () {

        },

        /**
         * 
         */
        _ixOnShow: function (win, eOpts) {

        },

        /**
         * 获取视图的控制按钮
         * 根据不同的视图，可以重载不同的操作按钮
         */
        _ixGetButtons: function () {
            return [];
        },

        /**
         * 关闭前事件处理，
         * 对于一些需要提示存在未保存数据的情况下进行处理
         */
        _ixOnBeforeClose: function () {
            var me = this;
            me._ixOnClose();
            return true;
        },

        /**
         * 触发自定义的关闭事件 ixclose
         */
        _ixOnClose: function () {
            var me = this;
            if (me.hasListeners.ixwinclose) {
                me.fireEvent('ixwinclose', me, Ext.clone(me.getIxReturn()));
            }
        },

        /**
         * 确定按钮的默认处理，可以被重载
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this;
            me.close();
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

        /**
         * 取消按钮的默认处理，可以被重载
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnCancel: function (item, e, eOpts) {
            var me = this;
            me.setIxReturn(null);
            me.close();
        }
    }

});