/**
 * @class iExt.meta.Entity
 * @extends {iExt.meta.Meta} 
 * @classdesc 元数据基础类。
 */
Ext.define('iExt.meta.Entity', {
    extend: 'iExt.meta.Meta',

    ixFields: [{
        ixNo: 0,
        type: 'string',
        ixName: 'id',
        ixTitle: '标识',
        ixIsRepoId: true,
        ixSubType: iExt.meta.ixtype.String.GUID
    }, {
        ixNo: 9999,
        type: 'int',
        ixName: 'version',
        ixTitle: '数据版本',
        ixSubType: iExt.meta.ixtype.Integer.INT
    }],

    ixActions: {
        _add: {
            type: 'view',
            ixName: '新建',
            //ixTarget: iExt.app.view.ViewTarget.FORM,
            ixIconCls: 'x-fa fa-plus'
        },
        _edit: {
            type: 'view',
            ixName: '修改',
            //ixTarget: iExt.app.view.ViewTarget.FORM,
            ixIconCls: 'x-fa fa-edit'
        },
        _detail: {
            type: 'view',
            ixName: '详细',
            //ixTarget: iExt.app.view.ViewTarget.DETAIL,
            ixIconCls: 'x-fa fa-file-o'
        },
        _remove: {
            type: 'api',
            ixApi: 'erase',
            ixName: '删除',
            ixIconCls: 'x-fa fa-trash'
        }
    }

});
