/**
 * @class iExt.form.field.ComboBox
 * @extends {Ext.form.field.ComboBox} 
 * @classdesc 显示组件。
 */
Ext.define('iExt.form.field.ComboBox', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.ixcombo',

    pickerOffset: [0, -1],
    defaultListConfig: {
        cls: 'ix-picker'
    }

});