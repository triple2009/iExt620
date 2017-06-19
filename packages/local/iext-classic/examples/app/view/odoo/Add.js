Ext.define('app.view.odoo.Add', {
    extend: 'iExt.app.view.container.Form',
    xtype: 'app-odoo-add',

    requires: [],

    title: '新建用户',

    tbar: {
        xtype: 'toolbar',
        items: [{
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
        }, {
            xtype: 'tbspacer',
            flex: 1
        }, {
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
        }, {
            xtype: 'tbspacer',
            flex: 2
        }]
    },

    items: [{
        xtype: 'ixform',
        ixFormType: 'edit',
        width: 750,

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
            ixScale: 'large',
            fieldLabel: '代码',
            bind: '{user.code}',
            reference: 'code',
            allowBlank: false
        }, {
            ixScale: 'large',
            fieldLabel: '姓名',
            bind: '{user.name}',
            reference: 'name',
            allowBlank: false
        }, {
            fieldLabel: 'Columns',
            xtype: 'ixcombo',
            store: {
                type: 'user'
            },
            pageSize: 5,
            valueField: 'email',
            displayField: 'name',
            ixLines: 'all',
            ixColumns: [{
                dataIndex: 'name',
                width: 100
            }, {
                dataIndex: 'email'
            }]
        }, {
            fieldLabel: 'ItemTpl',
            xtype: 'ixcombo',
            store: {
                type: 'user'
            },
            pageSize: 5,
            valueField: 'email',
            displayField: 'name',
            ixItemTpl: [
                '<div title="{name}: {email}">{name} ({phone})</div>'
            ]
        }, {
            fieldLabel: 'TagColumns',
            xtype: 'ixtag',
            store: {
                type: 'user'
            },
            pageSize: 5,
            ixLines: 'all',
            ixColumns: [{
                dataIndex: 'name',
                width: 100
            }, {
                dataIndex: 'email'
            }]
        }, {
            fieldLabel: 'TagTpl',
            xtype: 'ixtag',
            store: {
                type: 'user'
            },
            pageSize: 5,
            valueField: 'email',
            displayField: 'name',
            ixItemTpl: [
                '<div title="{name}: {email}">{name} ({phone})</div>'
            ]
        }, {
            fieldLabel: '电话',
            bind: '{user.mobilePhone}',
            reference: 'mobilePhone'
        }, {
            fieldLabel: '名称',
            bind: '{user.userName}',
            reference: 'userName'
        }, {
            fieldLabel: '密码',
            bind: '{user.password}',
            reference: 'password'
        }, {
            fieldLabel: '确认',
            reference: 'repwd'
        }]
    }]

});