/**
 * @class iExt.app.Logon
 * @extends {Ext.container.Viewport} 
 * @classdesc 登录视图的基础类。
 */
Ext.define('iExt.app.Logon', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.ixapplogon',

    requires: [
        'iExt.app.Runtime',
        'iExt.form.Panel'
    ],

    cls: 'ix-app-logon',

    config: {
        ixUser: undefined
    },

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    },

    /**
     * 登录事件。
     * @memberOf iExt.app.Logon#
     * @event ixlogon
     * @param {iExt.app.Logon} this iExt.app.Logon控件。
     * @param {String} code 登录用户代码。
     * @param {String} password 用户口令。
     */

    /**
     * 重载初始化控件。主要是创建登录页面的控件和布局。
     * @memberOf iExt.app.Logon#
     */
    initComponent: function () {
        var me = this;
        me.items = [];

        var form = {
            xtype: 'ixform',
            bodyPadding: '10 20 20 20',
            defaultButton: 'logonBtn',
            referenceHolder: true,
            title: iExt.app.Runtime.getIxAppName(),
            layout: {
                type: 'vbox'
            },

            defaults: {
                xtype: 'ixtextfield',
                msgTarget: 'title',
                labelAlign: 'top',
                margin: '10 0 10 0'
            },

            header: {
                cls: 'ix-logon-header',
                titleAlign: 'center'
            },

            items: [
                {
                    fieldLabel: '系统号',
                    name: 'code',
                    allowBlank: false,
                    triggers: {
                        user: {
                            cls: 'x-fa fa-user'
                        }
                    }
                },
                {
                    fieldLabel: '密码',
                    allowBlank: false,
                    name: 'password',
                    inputType: 'password',
                    triggers: {
                        lock: {
                            cls: 'x-fa fa-lock'
                        }
                    }
                },
                {
                    xtype: 'button',
                    reference: 'logonBtn',
                    text: '马上登录',
                    margin: '30 0 0 0',
                    minWidth: iExt.Theme.Logon.ixMinWidth,
                    listeners: {
                        click: { fn: me.ixOnLogon, scope: me }
                    }
                }
            ]
        };
        me.items.push(form);

        var cmp = {
            xtype: 'component',
            cls: 'ix-logon-copyright',
            html: '&copy;版权所有，保留所有权利！'
        };
        me.items.push(cmp);
        me.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var form = me.items.get(0);
        form.focus();
    },

    applyIxUser: function (user) {
        var me = this;
        if (Ext.isObject(user)) {
            user = Ext.clone(user);
            var code = me.down('textfield[name=code]');
            code.setValue(user.code);
            var password = me.down('textfield[name=password]');
            password.setValue(user.password);
        }
        return user;
    },

    /**
     * 登录操作事件处理。
     * @memberOf iExt.app.Logon#
     * @param {Ext.Component} item 触发事件的控件。
     * @param {Event} e 事件。
     * @param {Object} eOpts 事件参数。
     */
    ixOnLogon: function (item, e, eOpts) {
        var me = this;
        var form = me.down('form');
        if (!form || !form.isValid()) {
            return;
        }
        var user = form.getValues();
        me.fireEvent('ixlogon', user.code, user.password);
    }

});