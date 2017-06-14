Ext.define('app.view.user.View', {
    extend: 'iExt.panel.List',
    xtype: 'app-user-view',

    requires: [
        'app.enums.UserStatus'
    ],

    title: '用户视图',
    tbar: {
        xtype: 'toolbar',
        items: [{
            text: '新建'
        }, {
            text: '修改'
        }]
    },

    ixStore: {
        type: 'user'
    },

    ixItemTpl: '<span style="float:left;"><img style="width:68px;height:68px;" /></span>' +
        '<span style="float:left;margin-left:10px;">' +
        '<div style="font-size:16px;font-weight:bold;margin-bottom:15px;' +
        '<tpl if="status==1">color:#7a3737;' +
        '<tpl elseif="status==2">color:#756832;' +
        '<tpl elseif="status==4">color:#5d6937;' +
        '<tpl elseif="status==8">color:#1a5d83;' +
        '</tpl>">{name}</div><div>{phone}</div><div>{email}</div></span>',

    listeners: {
        ixitemclick: function (kanban, item, data) {
            iExt.Toast.ixInfo(data.name);
        }
    }

});