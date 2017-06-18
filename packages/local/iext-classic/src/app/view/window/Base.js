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
         * 调用该窗口的组件
         * {String}
         */
        ixEventItemId: null,

        /**
         * 视图类名称或视图组件配置
         * {String|Object}
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

    /**
     * 视图数据模型
     * 缺省值使用 {iExt.app.view.model.Container}
     */
    viewModel: 'ixviewcontainer',
    layout: 'fit',
    referenceHolder: true,

    bind: {
        /**
         * 绑定标题 title
         */
        title: '{title}'
    },

    /**
     * 设置视图
     */
    applyIxView: function (view) {
        var me = this;
        if (view) {
            if (this.rendered) {
                if (Ext.isString(view)) {
                    view = iExt.View.ixCreate(view);
                }
                me.removeAll();
                me.add(view);
            } else {
                if (Ext.isString(view)) {
                    view = {
                        xtype: view
                    };
                }
                me.items = [];
                me.items.push(view);
            }
        }
        return view;
    },

    initComponent: function () {
        var me = this;
        me.fbar = {
            xtype: 'toolbar',
            items: me._ixGetButtons()
        };
        me.on('add', me._ixOnAdd);
        me.on('show', me._ixOnShow, me);
        me.on('beforeclose', me._ixOnBeforeClose, me);
        me.callParent(arguments);
    },

    /**
     * 获取缺省视图
     * 添加渲染事件处理
     */
    afterRender: function () {
        var me = this;

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
         * 设置视图信息，例如绑定视图的事件等
         */
        _ixSetView: function () {

        },

        /**
         * 处理组件标题
         */
        _ixOnAdd: function (panel, component, index, eOpts) {
            if (component.isComponent === true && component.getTitle) {
                var me = this,
                    title = component.getTitle();
                var vm = this.getViewModel();
                vm.ixSetTitle(title);
                me.__ixView = component;
                me._ixSetView();
            }
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