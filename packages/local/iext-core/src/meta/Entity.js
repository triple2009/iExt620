Ext.define('iExt.meta.Entity', {
    extend: 'iExt.meta.Base',

    ixFields: [
         {
             ixType: 'guid',
             ixName: 'createdById',
             ixTitle: '创建用户标识',
             ixDataType: iExt.meta.DataType.STRING,
             ixSubType: iExt.meta.ixtype.String.GUID,
             ixWeight: 0
         },
         {
             ixName: 'createdBy_code',
             ixTitle: '创建用户代码',
             ixLen: 15,
             ixDataType: iExt.meta.DataType.STRING,
             ixSubType: iExt.meta.ixtype.String.STRING,
             ixWeight: 9.1
         },
         {
             ixName: 'createdBy_name',
             ixTitle: '创建用户名称',
             ixLen: 15,
             ixDataType: iExt.meta.DataType.STRING,
             ixSubType: iExt.meta.ixtype.String.STRING,
             ixWeight: 9.2
         },
         {
             type: 'date',
             ixType: 'datetime',
             ixName: 'createdOn',
             ixTitle: '创建时间',
             ixDataType: iExt.meta.DataType.DATE,
             ixSubType: iExt.meta.ixtype.Date.DATETIME,
             ixWeight: 9.3
         },
         {
             ixType: 'guid',
             ixName: 'modifiedById',
             ixTitle: '修改用户标识',
             ixDataType: iExt.meta.DataType.STRING,
             ixSubType: iExt.meta.ixtype.String.GUID,
             ixWeight: 0
         },
         {
             ixName: 'modifiedBy_code',
             ixTitle: '修改用户代码',
             ixLen: 15,
             ixDataType: iExt.meta.DataType.STRING,
             ixSubType: iExt.meta.ixtype.String.STRING,
             // 导航属性
             // ixNavigator: { ixModel: 'examples.model.User', ixProperty: 'modifiedById' },
             ixWeight: 10.1
         },
         {
             ixName: 'modifiedBy_name',
             ixTitle: '修改用户名称',
             ixLen: 15,
             ixDataType: iExt.meta.DataType.STRING,
             ixSubType: iExt.meta.ixtype.String.STRING,
             ixWeight: 10.2
         },
         {
             type: 'date',
             ixType: 'datetime',
             ixName: 'modifiedOn',
             ixTitle: '修改时间',
             ixDataType: iExt.meta.DataType.DATE,
             ixSubType: iExt.meta.ixtype.Date.DATETIME,
             ixWeight: 10.3
         }
    ],

    ixActions: {
        ixBase: {
            ixName: '维护',
            ixItems: {
                add: {
                    type: 'view',
                    ixName: '新建',
                    ixTarget: iExt.app.view.ViewTarget.FORM,
                    ixIconCls: 'x-fa fa-plus'
                },
                edit: {
                    type: 'view',
                    ixName: '修改',
                    ixTarget: iExt.app.view.ViewTarget.FORM,
                    ixIconCls: 'x-fa fa-edit'
                },
                detail: {
                    type: 'view',
                    ixName: '详细',
                    ixTarget: iExt.app.view.ViewTarget.DETAIL,
                    ixIconCls: 'x-fa fa-file-o'
                },
                remove: {
                    type: 'api',
                    ixApi: 'erase',
                    ixName: '删除',
                    ixIconCls: 'x-fa fa-trash'
                }
            }
        },
        ixSearch: {
            ixName: '搜索',
            ixItems: {
                search: {
                    type: 'view',
                    ixName: '搜索',
                    ixTarget: iExt.app.view.ViewTarget.SEARCH,
                    ixIconCls: 'x-fa fa-search'
                }
            }
        }
    }

});
