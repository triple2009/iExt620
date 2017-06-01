/**
 * @class iExt.button.Statistics
 * @extends {Ext.button.Button} 
 * @classdesc 带统计信息的按钮控件。
 */
Ext.define('iExt.button.Statistics', {
    extend: 'Ext.button.Button',
    alias: 'widget.ixstatbtn',

    requires: [],

    config: {
        value: null
    },

    cls: 'ix-stat-btn',
    textAlign: 'left',

    getTemplateArgs: function () {
        var me = this;
        var args = me.callParent();
        return Ext.apply(args, {
            value: me.getValue() || '&#160;'
        });
    },

    updateText: function (text, oldText) {
        text = text == null ? '' : String(text);
        oldText = oldText || '';

        var me = this,
            btnInnerEl = me.btnInnerEl;

        if (me.rendered) {
            var spanText = btnInnerEl.down('span:last-child');
            spanText.setHtml(text || '&#160;');
            me.updateLayout();
        }
        me.fireEvent('textchange', me, oldText, text);
    },

    updateValue: function (value, oldValue) {
        value = value == null ? '' : value;
        oldValue = oldValue || '';

        var me = this,
            btnInnerEl = me.btnInnerEl;

        if (me.rendered) {
            var spanValue = btnInnerEl.down('span:first-child');
            spanValue.setHtml(value || '&#160;');
            me.updateLayout();
        }
        me.fireEvent('ixvaluechange', me, oldValue, value);
    }

}, function (btnClass) {

    var _ixInjectTpl = '<span class="ix-stat-btn-value">{value}</span>' +
        '<span class="ix-stat-btn-text">{text}</span>',
        _ixInjectAt = '{text}';

    var superTpl = btnClass.superclass.renderTpl;
    var tpls = superTpl.split(_ixInjectAt);
    var myTpl = tpls.join(_ixInjectTpl);
    btnClass.addConfig({
        renderTpl: myTpl
    });

});