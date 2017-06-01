/**
 * @class iExt.button.Button
 * @extends {Ext.button.Button} 
 * @classdesc 按钮控件。
 */
Ext.define('iExt.button.Button', {
    extend: 'Ext.button.Button',
    alias: 'widget.ixbtn',

    requires: [],

    config: {
        ixBadgeText: null,
        ixBadgeStyle: null
    },

    cls: 'ix-btn',

    initComponent: function () {
        var me = this;
        me.callParent();
    },

    getTemplateArgs: function () {
        var me = this;
        var args = me.callParent();
        var badgeText = me.getIxBadgeText(),
            badgeStyle = Ext.DomHelper.generateStyles(me.getIxBadgeStyle());

        me.ixBadged = badgeText !== null;
        return Ext.apply(args, {
            badgeText: badgeText,
            badgeStyle: badgeStyle
        });
    },

    updateIxBadgeText: function (text, oldText) {
        text = text == null ? '' : String(text);
        oldText = oldText || '';

        var me = this,
            btnEl = me.btnEl;

        if (me.rendered && me.ixBadged) {
            var spanText = btnEl.down('span:last-child');
            spanText.setHtml(text || '&#160;');
            me.updateLayout();
        }
        me.fireEvent('ixbadgechange', me, oldText, text);
    },

    updateIxBadgeStyle: function (style, oldStyle) {
        var me = this,
            btnEl = me.btnEl;

        if (me.rendered && me.ixBadged) {
            var spanText = btnEl.down('span:last-child');
            spanText.setStyle(style);
            me.updateLayout();
        }
    }

}, function (btnClass) {

    var _ixInjectTpl = '{text}</span><tpl if="badgeText"><span class="ix-btn-badge"' +
        '<tpl if="badgeStyle"> style="{badgeStyle}"</tpl>>{badgeText}</span></tpl>',
        _ixInjectAt = '{text}</span>';

    var superTpl = btnClass.superclass.renderTpl;
    var tpls = superTpl.split(_ixInjectAt);
    var myTpl = tpls.join(_ixInjectTpl);
    btnClass.addConfig({
        renderTpl: myTpl
    });

});