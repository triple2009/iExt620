/**
 * @class iExt.app.tool.Widget
 * @extends {Ext.container.Container} 
 * @classdesc 控件调试。
 */
Ext.define('iExt.app.tool.Widget', {
    extend: 'Ext.container.Container',
    alias: 'widget.ixapptool',

    title: '控件调试',
    layout: 'border',

    referenceHolder: true,

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'panel',
            title: '预览',
            region: 'center',
            header: false,
            reference: 'pnlView',
            bodyPadding: 5,
            scrollable: 'y'
        }, {
            xtype: 'panel',
            title: '代码',
            header: false,
            split: true,
            weight: 20,
            height: 240,
            region: 'south',
            layout: 'fit',
            tbar: {
                xtype: 'toolbar',
                items: [{
                    text: '清除',
                    listeners: {
                        click: { fn: me._ixClear, scope: me }
                    }
                }, {
                    text: '创建',
                    listeners: {
                        click: { fn: me._ixAdd, scope: me }
                    }
                }, {
                    xtype: 'label',
                    reference: 'lblInfo'
                }]
            },
            items: [{
                xtype: 'textarea',
                reference: 'txtCode',
                inputAttrTpl: 'spellcheck=false',
                value: '{xtype:"toolbar",items:[' +
                        '{xtype:"textfield",value:"hello world"},' +
                        '{xtype:"button",text:"ok"}' +
                        ']}'
            }]
        }
        ];
        me.callParent(arguments);
    },

    privates: {

        _ixAdd: function () {
            var me = this,
                refs = me.getReferences();
            try {
                me._ixClear();
                var code = refs.txtCode.getValue();
                var cmpCode = Ext.decode(code);
                var cmp = refs.pnlView.add(cmpCode);
                var info;
                if (Ext.isArray(cmp)) {
                    info = '创建了 ' + cmp.length + ' 个控件...';
                } else {
                    info = '创建了 className: ' + cmp.$className +
                        ', id: ' + cmp.getId() + ' 的控件...';
                }
                refs.lblInfo.setText(info);
            } catch (e) {
                refs.pnlView.setHtml(
                    '<p><b>Message:</b> ' + e.message + '</p>' +
                    '<p><b>Stack:</b> ' + e.stack.replace(/\n/g, '<br/>') + '</p>');
                return true;
            }
        },

        _ixClear: function () {
            var me = this,
                refs = me.getReferences();
            refs.pnlView.removeAll();
            refs.pnlView.setHtml('');
            refs.lblInfo.setText('');
        }

    }

});
