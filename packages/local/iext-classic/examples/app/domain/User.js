Ext.define('app.domain.User', {
    extend: 'iExt.domain.Domain',

    ixName: '用户',

    ixActions: {
        test: {
            type: 'view',
            ixName: '测试'
        },
        add: {
            ixName: '新增'
        },
        active: {
            type: 'api',
            ixName: '有效'
        },
        inactive: {
            type: 'api',
            ixName: '无效'
        },
        rest: {
            type: 'api',
            ixName: '重置口令'
        },
        changePwd: {
            type: 'view',
            ixName: '变更口令'
        }
    },

    ixListViews: [{
        ixListType: 'list',
        xtype: 'app-user-list'
    }, {
        ixListType: 'kanban',
        xtype: 'panel',
        title: 'kanban'
    }, {
        ixListType: 'graph',
        xtype: 'panel',
        title: 'graph'
    }, {
        ixListType: 'calendar',
        xtype: 'panel',
        title: 'calendar'
    }, {
        ixListType: 'report',
        xtype: 'panel',
        title: 'report'
    }]

});