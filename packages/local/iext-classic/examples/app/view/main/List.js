/**
 * This view is an example list of people.
 */
Ext.define('app.view.main.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'app.store.User',
        'iExt.app.view.ListTypes'
    ],

    title: 'Personnel',
    controller: {
        type: 'ixlist'
    },
    store: {
        type: 'user'
    },
    ixIsList: true,

    tbar: {
        xtype: 'ixacttbr',
        ixAuthService: 'user',
        items: [{
            text: '新建',
            iconCls: 'x-fa fa-plus',
            ixAuth: 'add',
            ixAlign: {
                type: 'list',
                ixMode: null
            },
            listeners: {
                click: function (item, e, eOpts) {
                    iExt.Toast.ixInfo(item.getIxAuth().ixService);
                }
            }
        }, {
            text: '编辑',
            iconCls: 'x-fa fa-edit',
            ixAuth: {
                ixService: 'menu',
                ixOperation: 'edit'
            },
            ixAlign: {
                type: 'list',
                ixMode: false
            },
            listeners: {
                click: function (item, e, eOpts) {
                    iExt.Toast.ixInfo(item.getIxAuth().ixService);
                }
            }
        }, {
            text: '详细',
            iconCls: 'x-fa fa-file-o',
            ixAuth: {
                ixOperation: 'detail'
            },
            ixAlign: {
                type: 'list',
                ixMode: false
            },
            listeners: {
                click: function (item, e, eOpts) {
                    var data = item.getIxAlign().ixGetAlignData();
                    iExt.Toast.ixInfo(data[0].get('name'));
                }
            }
        }, {
            text: '删除',
            iconCls: 'x-fa fa-trash',
            ixAuth: {
                ixOperation: 'remove'
            },
            ixAlign: {
                type: 'list',
                ixMode: true,
                ixEnabledWhen: '"{name}"==="Worf"'
            },
            listeners: {
                click: function (item, e, eOpts) {
                    var data = item.getIxAlign().ixGetAlignData();
                    iExt.Toast.ixInfo(data.length);
                }
            }
        }, {
            xtype: 'ixactsbtn',
            ixEnumType: 'iExt.app.view.ListTypes',
            ixValue: iExt.app.view.ListTypes.LIST,
            allowToggle: true,
            listeners: {
                toggle: function (item, button, isPressed, eOpts) {
                    iExt.Toast.ixInfo(button.getText());
                }
            }
        }, {
            xtype: 'ixddfield',
            ixComponent: {
                xtype: 'app-user-add'
            }
        }, {
            text: '操作',
            menu: {
                xtype: 'ixactmenu',
                items: [{
                    text: '启用',
                    ixAuth: {
                        ixOperation: 'active'
                    },
                    ixAlign: {
                        type: 'list',
                        ixMode: null
                    }
                }, {
                    text: '停用',
                    ixAuth: {
                        ixOperation: 'inactive'
                    },
                    ixAlign: {
                        type: 'list',
                        ixMode: true
                    }
                }, {
                    text: '审批',
                    ixAuth: {
                        ixOperation: 'approve'
                    },
                    ixAlign: {
                        type: 'list',
                        ixMode: false
                    }
                }]
            }
        }, '->', {
            xtype: 'ixtagfilter',
            flex: 1,
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            }
        }]
    },

    dockedItems: [{
        xtype: 'ixsearchtbr',
        items: [{
            fieldLabel: '代码'
        }]
    }],

    columns: [{
        text: 'Name',
        dataIndex: 'name'
    }, {
        text: 'Email',
        dataIndex: 'email',
        flex: 1
    }, {
        text: 'Phone',
        dataIndex: 'phone',
        flex: 1
    }],

    listeners: {
        ixselection: function (item, selection) {
            iExt.Toast.ixInfo(selection[0].get('email'));
        }
    }
});