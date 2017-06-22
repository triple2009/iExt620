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
     * 操作工具栏组件{iExt.toolbar.*}标识集合
     * {String[]}
     */
    __ixActionBarIds: null,

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
        // 监听添加子组件事件处理
        me.on('add', me.ixOnAdd, me);
        // 为了自动处理工具栏组件的可用性操作
        // 需要监听工具栏的添加和删除事件处理
        me.on('dockedadd', me.ixOnDockedAdd, me);
        me.on('dockedremove', me.ixOnDockedRemove, me);
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
    },

    /**
     * 添加工具栏处理
     */
    ixOnDockedAdd: function (panel, component, index, eOpts) {
        // 具有获取操作组件标识的工具栏
        if (component.isComponent === true && component.ixGetActionIds) {
            var me = this,
                id = component.getId();
            me.__ixActionBarIds = me.__ixActionBarIds || {};
            me.__ixActionBarIds[id] = id;
        }
    },

    /**
     * 删除工具栏处理
     */
    ixOnDockedRemove: function (panel, component, eOpts) {
        if (component.isComponent === true && component.ixGetActionIds) {
            var me = this,
                id = component.getId();
            delete me.__ixActionBarIds[id];
        }
    },

    /**
     * 销毁处理，清除缓存的视图
     */
    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '__ixActionBarIds', '__ixCurrentView');
    }

});