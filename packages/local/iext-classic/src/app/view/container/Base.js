/**
 * @class iExt.app.view.container.Base
 * @extends {Ext.panel.Panel} 
 * @classdesc 视图容器。
 */
Ext.define('iExt.app.view.container.Base', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixviewcontainer',

    requires: [],

    border: false,
    layout: 'fit',
    referenceHolder: true,
    /**
     * 视图数据模型
     * 缺省值使用 {iExt.app.container.ViewModel}
     */
    viewModel: 'ixviewcontainer',

    config: {
        /**
         * 领域模型 String / iExt.domain.Domain
         * 领域模型类名称，或者domain的实例
         */
        ixDomain: null,
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
         * 视图规格
         */
        ixScale: 'normal'
    },

    /**
     * 视图类型
     */
    ixViewType: 'list',

    /**
     * 当前视图
     * 添加子组件后设置为当前视图
     */
    __ixCurrentView: null,

    /**
     * 设置视图
     */
    applyIxView: function (view) {
        var me = this;
        if (view) {
            view = iExt.View.ixGetView(view);
            if (me.rendered) {
                me.removeAll();
                me.add(view);
            } else {
                me.items = [];
                me.items.push(view);
            }
        }
        return view;
    },

    initComponent: function () {
        var me = this,
            scale = me.getIxScale();

        if (scale) {
            var size = iExt.View.ixGetScaleSize(me.ixViewType, scale);
            if (size) {
                Ext.applyIf(me, size);
            }
        }

        // 设置工具栏
        me.ixSetToolbar();
        // 监听事件处理
        me.on('add', me.ixOnAdd, me);
        me.callParent();
    },

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: Ext.emptyFn,

    /**
     * 设置当前视图
     */
    ixSetView: Ext.emptyFn,

    /**
     * 添加子组件后处理
     */
    ixOnAdd: function (panel, component, index, eOpts) {
        if (component.isComponent === true && component.getTitle) {
            var me = this,
                title = component.getTitle();
            var vm = this.getViewModel();
            vm.ixSetSubTitle(title);
            me.__ixCurrentView = component;
            me.ixSetView();
        }
    }

});