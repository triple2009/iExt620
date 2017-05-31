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
    textAlign: 'left',

    renderTpl:
        '<span id="{id}-btnWrap" data-ref="btnWrap" role="presentation" unselectable="on" style="{btnWrapStyle}" ' +
                'class="{btnWrapCls} {btnWrapCls}-{ui} {splitCls}{childElCls}">' +
            '<span id="{id}-btnEl" data-ref="btnEl" role="presentation" unselectable="on" style="{btnElStyle}" ' +
                    'class="{btnCls} {btnCls}-{ui} {textCls} {noTextCls} {hasIconCls} ' +
                    '{iconAlignCls} {textAlignCls} {btnElAutoHeightCls}{childElCls}">' +
                '<tpl if="iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl>' +
                '<span id="{id}-btnInnerEl" data-ref="btnInnerEl" unselectable="on" ' +
                    'class="{innerCls} {innerCls}-{ui}{childElCls}">{text}</span>' +
                '<tpl if="!iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl>' +
                // badge text
                '<tpl if="badgeText"><span class="ix-btn-badge"' +
                    '<tpl if="badgeStyle"> style="{badgeStyle}"</tpl>' +
                '>{badgeText}</span></tpl>' +
            '</span>' +
        '</span>' +
        '{[values.$comp.getAfterMarkup ? values.$comp.getAfterMarkup(values) : ""]}' +
        // if "closable" (tab) add a close element icon 
        '<tpl if="closable">' +
            '<span id="{id}-closeEl" data-ref="closeEl" class="{baseCls}-close-btn">' +
                '<tpl if="closeText">' +
                    ' {closeText}' +
                '</tpl>' +
            '</span>' +
        '</tpl>' +
        // Split buttons have additional tab stop for the arrow element 
        '<tpl if="split">' +
            '<span id="{id}-arrowEl" class="{arrowElCls}" data-ref="arrowEl" ' +
                'role="button" hidefocus="on" unselectable="on"' +
                '<tpl if="tabIndex != null"> tabindex="{tabIndex}"</tpl>' +
                '<tpl foreach="arrowElAttributes"> {$}="{.}"</tpl>' +
                ' style="{arrowElStyle}"' +
            '>{arrowElText}</span>' +
        '</tpl>',

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
    }

});