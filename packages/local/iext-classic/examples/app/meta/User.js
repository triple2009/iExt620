Ext.define('app.meta.User', {
    extend: 'iExt.meta.Aggregate',

    ixName: '用户',

    ixFields: [{
        ixName: 'code',
        ixTitle: '代码',
        ixSort: 'ASC',
        ixIsEntityId: true,
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        ixName: 'name',
        ixTitle: '名称',
        ixIsEntityDesc: true,
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        ixName: 'email',
        ixTitle: '邮箱',
        ixSubType: iExt.meta.ixtype.String.TEXT
    }, {
        type: 'int',
        ixName: 'status',
        ixTitle: '状态',
        ixSubType: iExt.meta.ixtype.Integer.INT
    }, {
        ixName: 'statusName',
        ixTitle: '状态',
        ixSubType: iExt.meta.ixtype.String.STRING
    }],

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
