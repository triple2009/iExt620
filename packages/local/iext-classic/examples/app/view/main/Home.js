Ext.define('app.view.main.Home', {
    extend: 'iExt.panel.ViewContainer',
    xtype: 'app-home',

    requires: [],

    layout: 'center',

    dockedItems: [{
        xtype: 'toolbar',
        items: [{
            xtype: 'ixviewtitle',
            html: '用户'
        }, '->', {
            xtype: 'textfield',
            triggers: {
                search: {
                    cls: 'x-fa fa-search'
                }
            }
        }]
    }, {
        xtype: 'ixviewtbr',
        items: [{
            text: '新建'
        }, '->', {
            text: '操作',
            menuAlign: 'tc-bc',
            minWidth: 120,
            menu: {
                xtype: 'menu',
                ui: 'ix-view-menu-ui',
                minWidth: 120,
                items: [{
                    text: '启用'
                }, {
                    text: '停用'
                }, {
                    text: '审批'
                }]
            }
        }, '->', {
            xtype: 'segmentedbutton',
            items: [{
                iconCls: 'x-fa fa-line-chart'
            }, {
                iconCls: 'x-fa fa-calendar'
            }, {
                iconCls: 'x-fa fa-th-large'
            }, {
                iconCls: 'x-fa fa-list'
            }]
        }]
    }],

    items: [{
        xtype: 'panel',
        width: '80%',
        items: [{
            xtype: 'textfield'
        }]
    }]

});