/**
 * @class iExt.form.Panel
 * @extends {Ext.form.Panel} 
 * @classdesc 表单控件的基础类。主要设置一些缺省样式和配置信息。
 */
Ext.define('iExt.form.Panel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixform',

    cls: 'ix-form',
    header: false,
    border: false,
    minWidth: 650,
    maxWidth: 860,
    minHeight: 400,
    trackResetOnLoad: true,
    bodyPadding: '16 16 16 16',
    defaultType: 'ixtext',
    defaultFocus: 'field:focusable:not([hidden]):not([disabled]):not([readOnly])',
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        margin: 5
    },

});