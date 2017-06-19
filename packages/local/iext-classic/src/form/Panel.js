/**
 * @class iExt.form.Panel
 * @extends {Ext.form.Panel} 
 * @classdesc 表单控件的基础类。主要设置一些缺省样式和配置信息。
 */
Ext.define('iExt.form.Panel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixform',

    cls: 'ix-form',
    mixins: [
        'iExt.mixin.FormView'
    ],

    header: false,
    border: false,
    minWidth: 650,
    maxWidth: 860,
    minHeight: 400,
    trackResetOnLoad: true,
    bodyPadding: 16,
    layout: 'column',
    defaults: {
        columnWidth: 0.5,
        labelAlign: 'left',
        labelWidth: 80,
        msgTarget: 'title',
        margin: '5 5 5 5'
    },

    initComponent: function () {
        var me = this,
            formType = me.getIxFormType(),
            scale = me.getIxScale();

        if (formType === iExt.app.view.FormTypes.DETAIL) {
            me.defaultType = 'ixdisplay';
        } else {
            me.defaultType = 'ixtext';
            me.defaultFocus = 'field:focusable:not([hidden]):not([disabled]):not([readOnly])';
        }
        me.callParent();
    },

        // 获取是否合法信息
    ixIsValid: function () {
        return this.getForm().isValid();
    }

});