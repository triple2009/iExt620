/**
 * @class iExt.meta.Entity
 * @extends {iExt.meta.Meta} 
 * @classdesc 实体元数据类。
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
    }]

});
