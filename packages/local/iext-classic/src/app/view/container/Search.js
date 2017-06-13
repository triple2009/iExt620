/**
 * @class iExt.app.view.container.Search
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 搜索视图容器。
 */
Ext.define('iExt.app.view.container.Search', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixsearchcontainer',

    requires: [],

    bodyPadding: '0 5 0 5',
    layout: 'auto',
    scrollable: 'y',
    ixDefaultTitle: '搜索',
    referenceHolder: true,

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
         * 视图规格
         */
        ixScale: 'normal'
    },

    /**
     * 缺省标题
     * 由于title属性用于绑定，不能直接设置标题？
     * 需要验证绑定属性的赋值操作？
     */
    ixDefaultTitle: '搜索',

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

    applyIxScale: function (scale) {
        var me = this;
        if (scale) {
            var size = iExt.View.ixGetScaleSize('search', scale);
            if (size) {
                Ext.applyIf(me, size);
            }
        }
        return scale;
    },

    initComponent: function () {
        var me = this;
        me.bbar = {
            xtype: 'toolbar',
            items: me._ixGetButtons()
        };
        me.on('add', me._ixOnAdd);
        me.callParent();
    },

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

    privates: {

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

        _ixSetView: function () {
            var me = this;
            if (me.__ixView) {
                if (me.__ixView.ixIsFilterView !== true) {
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
            me.__ixView.ixClear();
        },

        /**
         * 搜索事件处理
         * @param {Ext.Compomnent} item 触发事件的组件
         * @param {Event} e 事件
         * @param {Object} eOpts 事件选项
         */
        _ixOnOk: function (item, e, eOpts) {
            var me = this, filters = null;
            if (me.__ixView) {
                filters = me.__ixView.ixGetFilters();
            }
            me.fireEvent('ixclose', me, filters);
        }

    }

});