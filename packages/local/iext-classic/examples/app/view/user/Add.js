Ext.define('app.view.user.Add', {
    extend: 'iExt.app.view.container.Form',
    xtype: 'app-user-add',

    requires: [],

    title: '{_ixvc.title}',

    tbar: {
        xtype: 'toolbar',
        items: [{
            text: '编辑',
            iconCls: 'x-fa fa-edit',
            listeners: {
                click: function () {
                    var win = Ext.create({
                        xtype: 'ixwin',
                        title: {
                            xtype: 'toolbar',
                            items: [{
                                xtype: 'tbtext',
                                text: '文本'
                            }, '->', {
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                text: '按钮'
                            }]
                        },
                        width: 600,
                        height: 450
                    });
                    win.show();
                }
            }
        }, {
            text: '保存',
            iconCls: 'x-fa fa-save',
            listeners: {
                click: function () {
                    var win = Ext.create({
                        xtype: 'ixwin',
                        title: '常规',
                        modal: true,
                        maximizable: true,
                        width: 600,
                        height: 400,
                        viewModel: true,
                        buttons: [{
                            text: '确定',
                            listeners: {
                                click: function (item, e, eOpts) {
                                    var vm = this.ownerCt.ownerCt.getViewModel();
                                }
                            }
                        }]
                    });
                    win.show();
                }
            }
        }, {
            text: '取消',
            iconCls: 'x-fa fa-close',
            listeners: {
                click: function () {
                    Ext.Msg.confirm('系统更新', '系统存在新的版本，是否重新加载？',
                        function (choice) {
                            if (choice === 'yes') {

                            }
                        }
                    );
                }
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
        bodyPadding: '5 10 0 10',
        defaultType: 'textfield',
        defaults: {
            columnWidth: 0.5,
            margin: 10
        },

        tbar: {
            xtype: 'ixformheader',
            items: [{
                xtype: 'tbfill'
            }, {
                xtype: 'ixstatbtn',
                iconCls: 'x-fa fa-plus',
                text: 'Activities',
                value: 1000,
                listeners: {
                    click: function (item, e, eOpts) {
                        item.setText('new text');
                        item.setValue(200);
                    }
                }
            }, {
                xtype: 'ixactbtn',
                text: 'Inactivated',
                ixBadgeText: '9000',
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
                iconCls: 'x-fa fa-search'
            }]
        },

        items: [{
                xtype: 'ixtext',
                ixScale: 'large',
                fieldLabel: '代码',
                bind: '{_ixvc.title}',
                reference: 'code',
                allowBlank: false
            },
            {
                xtype: 'ixtext',
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
            }
        ]
    }, {
        xtype: 'tabpanel',
        margin: '20 0 0 0',
        minHeight: 200,
        items: [{
            xtype: 'panel',
            title: 'internal messages'
        }, {
            xtype: 'panel',
            title: 'others'
        }]
    }]

});