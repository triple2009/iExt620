/**
 * @class iExt.form.field.Search
 * @extends {Ext.form.field.Text} 
 * @classdesc iExt 筛选条件控件。
 */
Ext.define('iExt.form.field.Search', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixfilterfield',

    cls: 'ix-form',
    layout: 'column',
    header: false,
    bodyPadding: '5 10 0 10',
    defaultType: 'ixtextfield',
    defaultFocus: 'field:focusable:not([hidden]):not([disabled]):not([readOnly])',
    trackResetOnLoad: true

});