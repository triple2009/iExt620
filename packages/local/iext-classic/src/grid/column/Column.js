/**
 * @class iExt.grid.column.Column
 * @override {Ext.grid.column.Column} 
 * @classdesc 设置列标题居中，缺省不允许排序。
 */
Ext.define('iExt.grid.column.Column', {
    extend: 'Ext.grid.column.Column',
    alternateClassName: 'iExt.Column',
    alias: 'widget.ixcol',

    align: 'left',
    sortable: false,
    tooltipType: 'title',
    textAlign: 'left'

});