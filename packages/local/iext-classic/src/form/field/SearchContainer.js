/**
 * @class iExt.form.field.SearchContainer
 * @extends {Ext.form.FieldContainer}
 * @classdesc 搜索容器组件。
 */
Ext.define('iExt.form.search.Container', {
    extend: 'Ext.form.FieldContainer',
    alias: 'widget.ixsearchct',

    mixins: [
        'iExt.mixin.Search'
    ],

    cls: 'ix-search-ct',
    layout: 'hbox',
    referenceHolder: true,

    defaults: {
        labelWidth: 50,
        margin: '0 5 0 0'
    },

    initComponent: function () {
        var me = this;
        if (me.ixAutoSearch === true) {
            me.ixSetAutoSearch(me.items);
        }
        me.callParent();
    },

    afterRender: function () {
        var me = this;
        me.add({
            xtype: 'ix-actbtn',
            iconCls: 'x-fa fa-search',
            tooltip: '快速搜索',
            listeners: {
                click: { fn: me.ixOnQuickSearch, scope: me }
            }
        });
        me.callParent(arguments);
    }

});