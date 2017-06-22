Ext.define('app.view.odoo.All', {
    extend: 'iExt.app.view.container.List',
    xtype: 'app-odoo-all',

    requires: [

    ],

    title: '用户All In One',

    initComponent: function () {
        var me = this;
        var tbar = {
            xtype: 'ixlisttbr',
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
            }, '->', {
                text: '操作',
                menuAlign: 'tc-bc',
                menu: {
                    xtype: 'menu',
                    shadow: false,
                    items: [{
                        text: '启用'
                    }, {
                        text: '停用'
                    }, {
                        text: '审批'
                    }]
                }
            }, '->']
        };

        var viewBtns = me.ixGetViewButtons();
        if (viewBtns) {
            tbar.items.push(viewBtns);
        }

        tbar.items.push({
            xtype: 'ixtagsearch',
            ixView: 'app-user-search',
            flex: 3,
            store: {
                type: 'ixenumsstore',
                ixEnumType: 'iExt.meta.Types'
            }
        });
        me.tbar = tbar;
        me.callParent();
    },

    ixView: [{
        ixListType: 'list',
        xtype: 'app-odoo-list'
    }, {
        ixListType: 'kanban',
        xtype: 'app-odoo-kanban'
    }, {
        ixListType: 'graph',
        xtype: 'app-odoo-view'
    }]

});