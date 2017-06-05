/**
 * This view is an example list of people.
 */
Ext.define('app.view.main.List', {
    extend: 'iExt.grid.Panel',
    xtype: 'mainlist',

    requires: [
        'app.store.Personnel'
    ],

    title: 'Personnel',
    controller: {
        type: 'ixlist'
    },
    store: {
        type: 'personnel'
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
                ixMode: true
            },
            listeners: {
                click: function (item, e, eOpts) {
                    iExt.Toast.ixInfo(item.getIxAuth().ixService);
                }
            }
        }]
    },

    columns: [{
            text: 'Name',
            dataIndex: 'name'
        },
        {
            text: 'Email',
            dataIndex: 'email',
            flex: 1
        },
        {
            text: 'Phone',
            dataIndex: 'phone',
            flex: 1
        }
    ]
});