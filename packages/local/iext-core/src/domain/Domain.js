/**
 * @class iExt.domain.Domain
 * @extends {Ext.Base} 
 * @classdesc 领域模型类。
 */
Ext.define('iExt.domain.Domain', {
    alternateClassName: 'iExt.Domain',

    requires: [
    ],

    config: {
        // 领域代码，例如：user
        ixCode: '',
        // 领域中文名称，例如：用户
        ixName: null,
        // 操作集合对象，例如：新建、修改、审核等
        // {add: '新建', edit: '编辑', ...}
        ixOperations: null,

        // 元数据
        ixMeta: null
    },

    // 缺省的操作集合对象
    _ixDefaultOperations: {
        add: '新建'
    }

});
