/**
 * @class Ext.overrides.form.field.Base
 * @override {Ext.form.field.Base} 
 * @classdesc 设置必须输入项的标签样式。
 */
Ext.define('Ext.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',

    msgTarget: 'title',
    labelSeparator: '&nbsp：',
    ixLabelRequiredCls: 'ix-label-required',

    initComponent: function () {
        var me = this;
        if (me.allowBlank === false && me.hasVisibleLabel() === true) {
            me.labelSeparator = '<span class="' + me.ixLabelRequiredCls + '"></span>:';
            //me.beforeLabelTextTpl = '<span class="' + me.ixLabelRequiredCls + '">*</span>';
        }
        me.callParent(arguments);
    }

});