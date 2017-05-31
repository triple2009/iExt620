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
    scale: 'large',
    minWidth: 140,
    textAlign: 'left',

    renderTpl:
        '<span id="{id}-btnWrap" data-ref="btnWrap" role="presentation" unselectable="on" style="{btnWrapStyle}" ' +
                'class="{btnWrapCls} {btnWrapCls}-{ui} {splitCls}{childElCls}">' +
            '<span id="{id}-btnEl" data-ref="btnEl" role="presentation" unselectable="on" style="{btnElStyle}" ' +
                    'class="{btnCls} {btnCls}-{ui} {textCls} {noTextCls} {hasIconCls} ' +
                    '{iconAlignCls} {textAlignCls} {btnElAutoHeightCls}{childElCls}">' +
                '<tpl if="iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl>' +
                '<span id="{id}-btnInnerEl" data-ref="btnInnerEl" unselectable="on" ' +
                    'class="{innerCls} {innerCls}-{ui}{childElCls}">' + 
                    // statics value
                    '<span class="ix-stat-btn-value">{value}</span>' +
                    // statics text
                    '<span class="ix-stat-btn-text">{text}</span>' +
                '</span>' +
                '<tpl if="!iconBeforeText">{[values.$comp.renderIcon(values)]}</tpl>' +
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

});