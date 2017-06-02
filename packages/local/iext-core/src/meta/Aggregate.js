Ext.define('iExt.meta.Aggregate', {
    extend: 'iExt.meta.Entity',

    ixFields: [{
        type: 'string',
        ixName: 'createdById',
        ixTitle: '创建用户标识',
        ixSubType: iExt.meta.ixtype.String.GUID
    }, {
        ixName: 'createdBy_code',
        ixTitle: '创建用户代码',
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        ixName: 'createdBy_name',
        ixTitle: '创建用户名称',
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        type: 'date',
        ixName: 'createdOn',
        ixTitle: '创建时间',
        ixSubType: iExt.meta.ixtype.Date.DATETIME
    }, {
        ixName: 'modifiedById',
        ixTitle: '修改用户标识',
        ixSubType: iExt.meta.ixtype.String.GUID
    }, {
        ixName: 'modifiedBy_code',
        ixTitle: '修改用户代码',
        ixSubType: iExt.meta.ixtype.String.STRING
        // 导航属性
        // ixNavigator: { ixModel: 'examples.model.User', ixProperty: 'modifiedById' }
    }, {
        ixName: 'modifiedBy_name',
        ixTitle: '修改用户名称',
        ixSubType: iExt.meta.ixtype.String.STRING
    }, {
        type: 'date',
        ixName: 'modifiedOn',
        ixTitle: '修改时间',
        ixSubType: iExt.meta.ixtype.Date.DATETIME
    }],

    ixActions: {
        _search: {
            type: 'view',
            ixName: '搜索',
            //ixTarget: iExt.app.view.ViewTarget.SEARCH,
            ixIconCls: 'x-fa fa-search'
        }
    }

});
