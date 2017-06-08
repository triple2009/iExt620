﻿/**
 * @class iExt.toolbar.Search
 * @extends {Ext.toolbar.List} 
 * @classdesc 搜索工具栏控件。
 */
Ext.define('iExt.toolbar.Search', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.ixsearchtbr',

    mixins: [
        'iExt.mixin.Search'
    ],

    cls: 'ix-search-tbr',

    ixTheme: {
        labelWidth: 50
    },

    layout: 'hbox',
    defaultType: 'ixtext',
    referenceHolder: true,

    /**
     * 快速搜索事件。
     * @memberOf iExt.toolbar.Search#
     * @event ixquicksearch
     * @param {iExt.toolbar.Search} this iExt.toolbar.Search控件。
     * @param {Object[]} filters 快速搜索条件集合。
     */

    /**
     * 重载初始化控件。主要是根据HFX配置项创建搜索项目和搜索按钮。
     * @memberOf iExt.toolbar.Search#
     */
    initComponent: function () {
        var me = this;

        me.defaults = {
            labelWidth: me.ixTheme.labelWidth
        };

        if (me.ixAutoSearch === true) {
            me.ixSetAutoSearch(me.items);
        }
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this,
            target = me.getIxAlignTarget();

        var align = {
            type: 'list',
            ixMode: null,
            ixTarget: target
        };
        var btns = {
            xtype: 'ixactsbtn',
            allowToggle: false,
            items: [{
                xtype: 'ixactbtn',
                iconCls: 'x-fa fa-search',
                tooltip: '快速搜索',
                ixAlign: align,
                listeners: {
                    click: { fn: me.ixOnQuickSearch, scope: me }
                }
            }, {
                xtype: 'ixactbtn',
                iconCls: 'x-fa fa-clipboard',
                tooltip: '清空快速搜索条件',
                ixAlign: align,
                listeners: {
                    click: { fn: me.ixOnClear, scope: me }
                }
            }]
        };
        this.__ixSearch = me.add(btns);
        me.callParent(arguments);
    },

    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '__ixSearch');
    }

});