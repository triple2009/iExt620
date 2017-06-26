/**
 * @class iExt.app.view.container.Form
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 表单视图容器。
 */
Ext.define('iExt.app.view.container.Form', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixformcontainer',

    requires: [],

    cls: 'ix-form-container',
    bodyCls: 'ix-form-container-body',

    layout: 'auto',
    scrollable: 'y',
    title: '表单',

    config: {
        /**
         * 表单视图。
         */
        ixView: null,
        /**
         * 操作组件集合。
         */
        ixActionItems: []
    },

    initComponent: function () {
        var me = this,
            title = me.getTitle();
        if (title) {
            me.setBind({
                title: '{title}'
            });
            vm = me.getViewModel();
            vm.ixSetTitle(title);
        }
        me.callParent();
    },

    /**
     * 设置容器的工具栏
     */
    ixSetToolbar: function () {
        var me = this,
            items = [];

        var actItems = me.getIxActionItems() || [];
        if (actItems.length > 0) {
            items = items.concat(actItems);
        }

        me.tbar = {
            xtype: 'ixacttbr',
            items: items
        };
    },

    /**
     * 设置缺省视图
     */
    ixSetDefaultView: function () {
        var me = this,
            view = me.getIxView();
        if (view) {
            Ext.suspendLayouts();
            me.removeAll();
            me.add(view);
            Ext.resumeLayouts(true);
        }
    },

    /**
     * 当前视图变更模板方法
     */
    ixOnViewChanged: function (view) {
        var me = this;
        if (view) {
            if (view.ixIsFormView !== true) {
                Ext.raise('指定的视图不是表单视图！');
            }
        }
        me.callParent(arguments);
    }

});