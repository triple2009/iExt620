Ext.define('app.view.odoo.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'app-odoo-list',

    requires: [
        'iExt.grid.column.Column'
    ],
    layout: 'fit',

    title: 'Users',
    controller: {
        type: 'ixlist'
    },

    ixStore: {
        type: 'user'
    },
    //ixPreviewField: 'email',
    ixQuickView: 'ixqvform',
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
                    //var data = item.getIxAlign().ixGetAlignData();
                    item.fireEvent('ixopenview', item, 'app-odoo-add', {
                        target: iExt.action.ViewTarget.MAIN
                    });
                }
            },
            ixViewName: 'app-user-add'
        }, {
            xtype: 'tbspacer',
            flex: 1
        }, {
            text: '操作',
            menu: {
                xtype: 'ixactmenu',
                items: [{
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
                            iExt.View.ixOpenView(item, {
                                xtype: 'ixqvform',
                                ixRecord: data[0]
                            }, 'quick');
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
                }, '-', {
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
        }, {
            xtype: 'ixtagsearch',
            ixView: 'app-user-search',
            flex: 2,
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            }
        }]
    },

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

    initComponent: function () {
        var me = this;
        // itemclick 与数据选择有冲突
        me.on('itemdblclick', me.ixOnItemClick, me);
        me.callParent();
    },

    ixOnItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        /*
        iExt.View.ixOpenView(me, {
            xtype: 'ixqvform',
            ixRecord: record
        }, 'quick');
        */
        me.fireEvent('ixopenview', item, 'app-user-detail', {
            target: iExt.action.ViewTarget.MAIN
        });
    }

});