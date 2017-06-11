/**
 * @class iExt.form.Panel
 * @extends {Ext.form.Panel} 
 * @classdesc 表单控件的基础类。主要设置一些缺省样式和配置信息。
 */
Ext.define('iExt.form.Panel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixform',

    cls: 'ix-form',
    layout: 'column',
    header: false,
    border: false,
    minWidth: '765',
    minHeight: 400,
    bodyPadding: '5 10 0 10',
    defaultType: 'ixtext',
    defaultFocus: 'field:focusable:not([hidden]):not([disabled]):not([readOnly])',
    trackResetOnLoad: true

});