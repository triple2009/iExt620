/**
 * @class Ext.overrides.form.field.Base
 * @override {Ext.form.field.Base} 
 * @classdesc 设置必须输入项的标签样式。
 */
Ext.define('Ext.overrides.form.field.Base', {
    override: 'Ext.form.field.Base',

    msgTarget: 'title',
    ixLabelRequiredCls: 'ix-label-required',

    initComponent: function () {
        var me = this;
        if (me.allowBlank === false && me.hasVisibleLabel() === true) {
            // 如果能够判断 label 对齐方式
            // 当左对齐时，在后面添加；如果右对齐在前面添加
            me.afterLabelTextTpl = '<span class="' + me.ixLabelRequiredCls + '">*</span>';
        }
        me.callParent(arguments);
    }

});