/**
 * @class iExt.meta.Base
 * @extends {iExt.meta.Meta} 
 * @classdesc 元数据基础类。
 */
Ext.define('iExt.meta.Base', {
    extend: 'iExt.meta.Meta',

    ixFields: [
        {
            ixType: 'guid',
            ixName: 'id',
            ixTitle: '标识',
            ixIsRepoId: true,
            ixDataType: iExt.meta.DataType.STRING,
            ixSubType: iExt.meta.ixtype.String.GUID,
            ixWeight: 0
        },
        {
            type: 'int',
            ixName: 'version',
            ixTitle: '数据版本',
            ixDataType: iExt.meta.DataType.INTEGER,
            ixSubType: iExt.meta.ixtype.Integer.INT,
            ixWeight: 9999
        }
    ]

});
