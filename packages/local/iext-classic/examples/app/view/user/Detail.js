Ext.define('app.view.user.Detail', {
    extend: 'iExt.app.view.container.Form',
    xtype: 'app-user-detail',

    title: '用户详细',

    tbar: {
        xtype: 'toolbar',
        items: [{
            text: '编辑',
            iconCls: 'x-fa fa-edit',
            listeners: {
                click: function () {}
            }
        }, '->', {
            text: '操作',
            menuAlign: 'tc-bc',
            menu: {
                xtype: 'menu',
                shadow: false,
                items: [{
                    text: '启用',
                    listeners: {
                        click: function () {
                            iExt.Toast.ixInfo('hello ' + Ext.Number.randomInt(0, 100) + ' !');
                        }
                    }
                }, {
                    text: '停用'
                }, {
                    text: '审批'
                }]
            }
        }, '->']
    },

    items: [{
        xtype: 'ixform',
        layout: 'column',
        header: false,
        width: 750,
        defaults: {
            columnWidth: 0.5,
            margin: 10
        },

        tbar: {
            xtype: 'ixformheader',
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'segmentedbutton',
                allowToggle: false,
                defaults: {
                    scale: 'small',
                    width: 150
                },
                items: [{
                    xtype: 'ixstatbtn',
                    iconCls: 'x-fa fa-plus',
                    text: 'Activities',
                    value: 100,
                    listeners: {
                        click: function (item, e, eOpts) {
                            item.setText('new text');
                            item.setValue(200);
                        }
                    }
                }, {
                    xtype: 'ixactbtn',
                    text: 'status',
                    ixBadgeText: '900',
                    iconCls: 'x-fa fa-plus',
                    listeners: {
                        click: function (item, e, eOpts) {
                            item.setIxBadgeText('888');
                            item.setText('new text');
                        }
                    }
                }, {
                    text: 'Active'
                }, {
                    text: '中文测试',
                    iconCls: 'x-fa fa-search',
                    listeners: {
                        click: function (item, e, eOpts) {
                            //var data = item.getIxAlign().ixGetAlignData();
                            item.fireEvent('ixopenview', item, 'app-user-edit', {
                                target: iExt.action.ViewTarget.MAIN
                            });
                        }
                    }
                }]
            }]
        },

        items: [{
                ixScale: 'large',
                fieldLabel: '代码',
                bind: '{user.code}',
                value: 'code',
                reference: 'code',
                allowBlank: false
            },
            {
                ixScale: 'medium',
                fieldLabel: '姓名',
                bind: '{user.name}',
                value: 'name',
                reference: 'name',
                allowBlank: false
            },
            {
                fieldLabel: '电话',
                bind: '{user.mobilePhone}',
                reference: 'mobilePhone',
                value: '电话',
                allowBlank: false
            },
            {
                fieldLabel: '名称',
                bind: '{user.userName}',
                value: '名称',
                reference: 'userName'
            },
            {
                fieldLabel: '密码',
                bind: '{user.password}',
                value: '密码',
                reference: 'password'
            },
            {
                fieldLabel: '确认',
                value: '确认',
                reference: 'repwd'
            }
        ]
    }]
});