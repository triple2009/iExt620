Ext.define('app.view.user.Add', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-user-add',

    requires: [],

    width: 400,
    title: '用户',
    items: [{
        xtype: 'form',
        //layout: 'column',
        header: false,
        margin: 30,
        border: true,
        bodyPadding: '5 10 0 10',
        defaultType: 'textfield',
        defaults: {
            columnWidth: 0.5
        },
        defaultFocus: 'field:focusable:not([hidden]):not([disabled]):not([readOnly])',

        items: [{
            fieldLabel: '代码',
            bind: '{user.code}',
            reference: 'code',
            allowBlank: false
        },
        {
            fieldLabel: '姓名',
            bind: '{user.name}',
            reference: 'name'
        },
        {
            fieldLabel: '电话',
            bind: '{user.mobilePhone}',
            reference: 'mobilePhone'
        },
        {
            fieldLabel: '名称',
            labelAlign: 'right',
            bind: '{user.userName}',
            reference: 'userName'
        },
        {
            fieldLabel: '密码',
            bind: '{user.password}',
            reference: 'password'
        },
        {
            fieldLabel: '确认',
            reference: 'repwd'
        }]
    }]

});