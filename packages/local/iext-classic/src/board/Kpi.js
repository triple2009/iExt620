/**
 * @class iExt.board.Kpi
 * @extends {Ext.Component} 
 * @classdesc 表单工具栏控件。
 */
Ext.define('iExt.board.Kpi', {
    extend: 'Ext.Component',
    alias: 'widget.ixkpibtn',

    requires: [],

    config: {
        ixIconCls: undefined,
        ixScale: 'medium',
        ixKpi: undefined,
        ixKpm: undefined
    },

    cls: 'ix-kpi-btn',
    minWidth: 140,
    tpl: [
        '<tpl for=".">' +
        '<span id="{id}-btnIconEl" data-ref="btnIconEl" role="presentation" ' +
        'unselectable="on" class="{ixIconCls} ">{ixKpi}'  +
        '</span>' +
        '</tpl>'
    ],

    initComponent: function () {
        var me = this;
        me.renderData = { ixKpi: 'sdfsfdsf' };
        me.callParent();
    }

});