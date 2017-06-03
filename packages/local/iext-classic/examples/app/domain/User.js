Ext.define('app.domain.User', {
    extend: 'iExt.meta.Domain',

    ixName: '用户',

    ixActions: {
        test: {
            type: 'view',
            ixName: '测试'
        },
        _add: {
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
    }

});
