/**
 * @class iExt.grid.Panel
 * @extends {Ext.grid.Panel} 
 * @classdesc GridPanel基础类。
 */
Ext.define('iExt.grid.Panel', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ixgrid',

    requires: [
        'iExt.grid.column.Column'
    ],

    mixins: [
        'iExt.mixin.List'
    ],

    config: {
        /**
         * 缺省不使用单元格焦点样式。
         * 但是对于有些情况，例如：可以选择单元格时则需要使用。
         */
        ixFocus: false
    },

    columnLines: true,
    headerBorders: true,
    viewConfig: {
        enableTextSelection: true
    },

    defaults: {
        xtype: 'ixcol'
    },

    applyIxMulti: function (multi) {
        var me = this;
        if (multi !== undefined) {
            me.selModel = {
                type: 'checkboxmodel',
                mode: multi === true ? 'MULTI' : 'SINGLE',
                checkOnly: true,
                listeners: {
                    selectionchange: {
                        fn: me.ixOnSelectionChange,
                        scope: me
                    }
                }
            };
        }
        return multi;
    },

    applyIxFocus: function (focus) {
        var me = this;
        if (focus === false) {
            me.cls = 'ix-grid-no-focus';
        } else {
            me.cls = 'ix-grid';
        }
        return focus;
    },

    initComponent: function () {
        var me = this;
        me.callParent();
    },

    ixGetSelectedData: function () {
        var data = this.view.getSelection();
        return data;
    },

    ixSearch: function (filters) {
        var me = this,
            store = me.getStore(),
            _filters = null;

        if (store) {
            store.clearFilter(true);
            // 需要处理缺省的搜索条件
            _filters = filters;

            if (Ext.isObject(_filters)) {
                store.filter(_filters);
            } else if (Ext.isArray(_filters) && _filters.length > 0) {
                store.filter(_filters);
            } else {
                store.load();
            }
        }
    },

    ixOnSelectionChange: function (sm, selections) {
        if (this.hasListeners.ixselection) {
            this.fireEvent('ixselection', this, selections);
        }
    }

});