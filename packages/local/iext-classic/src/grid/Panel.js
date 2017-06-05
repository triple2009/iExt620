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

    config: {
        
        /**
         * 缺省使用复选，如果不想使用选择器，可以设置为 undefined
         */
        ixMulti: true,
        
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
                checkOnly: true
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
    }

});