/**
 * @class iExt.form.SearchContainer
 * @extends {Ext.form.FieldContainer}
 * @classdesc 搜索容器组件。
 */
Ext.define('iExt.form.SearchContainer', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.ixsearchct',

    mixins: [
        'iExt.mixin.Search'
    ],

    cls: 'ix-search-ct',
    layout: 'hbox',
    referenceHolder: true,

    ixTheme: {
        labelWidth: 50,
        margin: '0 5 0 0',
        minWidth: 300
    },

    initComponent: function () {
        var me = this;

        me.defaults = {
            labelWidth: me.ixTheme.labelWidth,
            margin: me.ixTheme.margin
        };
        me.minWidth = me.minWidth || me.ixTheme.minWidth;

        if (me.ixAutoSearch === true) {
            me.ixSetAutoSearch(me.items);
        }
        me.callParent();
    },

    afterRender: function () {
        var me = this,
            target = me.getIxAlignTarget();

        var align = {
            type: 'list',
            ixMode: null,
            ixTarget: target
        };

        me.ixEventItem = me.add({
            xtype: 'ixactbtn',
            iconCls: 'x-fa fa-search',
            // 使用工具栏按钮样式
            ui: 'default-toolbar',
            tooltip: '快速搜索',
            ixAlign: align,
            listeners: {
                click: {
                    fn: me.ixOnQuickSearch,
                    scope: me
                }
            }
        });
        me.callParent(arguments);
    }

});