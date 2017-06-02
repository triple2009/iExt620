/**
 * @class iExt.meta.Meta
 * @extends {Ext.Base} 
 * @classdesc 元数据基础类。
 */
Ext.define('iExt.meta.Meta', {
    alternateClassName: 'iExt.Meta',

    requires: [
        'iExt.meta.field.*',
        'iExt.meta.ixtype.*'
    ],

    config: {
        /**
         * 缺省排序列集合
         */
        ixSorters: [],
        /**
         * 元数据字段集合
         */
        ixFields: [],
        /**
         * 实体模型类名称
         */
        ixModelClass: null
    },

    /**
     * 服务代码，例如：user
     */
    ixCode: '',

    /**
     * 服务名称，例如：用户
     */
    ixName: '',

    /**
     * 操作集合对象，例如：新建、修改、审核等
     * {add: '新建', edit: '编辑', ...}
     */
    ixActions: null,

    /**
     * 缺省排序列集合
     */
    ixSorters: [],

    /**
     * 元数据字段集合
     */
    ixFields: [],

    /**
     * 仓储标识字段 (meta field)
     */
    ixRepoId: null,

    /**
     * 实体标识字段 (meta field)
     */
    ixEntityId: null,

    /**
     * 实体描述字段 (meta field)
     */
    ixEntityDesc: null,

    constructor: function (config) {
        this.initialConfig = config;
        this.initConfig(config);
    },

    applyIxFields: function (fields) {
        if (fields) {
            this.ixFields = fields;
        }
        return fields;
    },

    applyIxSorters: function (sorters) {
        if (sorters) {
            this.ixSorters = sorters;
        }
        return sorters;
    },

    statics: {

        /**
         * 按照属性序号排序
         */
        ixSortByNo: function (a, b) {
            // a is less than b by some ordering criterion return -1
            // a is greater than b by the ordering criterion return 1
            // a is equal to b by the ordering criterion return 0
            if (a.ixNo < b.ixNo) {
                return -1;
            } else if (a.ixNo > b.ixNo) {
                return 1;
            } else {
                return 0;
            }
        }

    },

    privates: {

        statics: {

            _ixInitFields: function (data, cls, proto) {
                var Field = iExt.meta.Field;
                var fieldDefs = data.ixFields;
                var superFields = proto.ixFields;
                var i, length, field, ixField;
                var fields = [], sorters = [];

                if (superFields) {
                    for (i = 0, length = superFields.length; i < length; ++i) {
                        field = Ext.Object.chain(superFields[i]);
                        field.owner = cls;
                        fields.push(field);
                    }
                }
                if (fieldDefs) {
                    delete data.ixFields;
                    delete data.ixSorters;
                    for (i = 0, length = fieldDefs.length; i < length; ++i) {
                        field = fieldDefs[i];
                        if (field.ixSort) {
                            sorters.push({
                                ixName: field.ixName,
                                ixSortDir: field.ixSort
                            });
                        }
                        ixField = Field.create(field);
                        if (field.ixIsRepoId === true) {
                            cls.ixRepoId = proto.ixRepoId = ixField;
                        }
                        if (field.ixIsEntityId === true) {
                            cls.ixEntityId = proto.ixEntityId = ixField;
                        }
                        if (field.ixIsEntityDesc === true) {
                            cls.ixEntityDesc = proto.ixEntityDesc = ixField;
                        }
                        fields.push(ixField);
                    }
                }

                // 按照序号排序所有列
                fields.sort(iExt.Meta.ixSortByNo);
                cls.ixFields = proto.ixFields = fields;
                cls.ixSorters = proto.ixSorters = sorters;
            },

            _ixInitActions: function (data, cls, proto) {
                var actionsDefs = data.ixActions;
                var superActions = proto.ixActions;
                var i, length, actionProp, action;

                var actions = {};
                if (superActions) {
                    for (actionProp in superActions) {
                        if (superActions.hasOwnProperty(actionProp)) {
                            action = Ext.clone(superActions[actionProp]);
                            if (action!==false){
                                actions[actionProp] = action;
                            }
                         }
                    }
                }

                if (actionsDefs) {
                    delete data.ixActions;
                    for (actionProp in actionsDefs) {
                        if (actionsDefs.hasOwnProperty(actionProp)) {
                            action = Ext.clone(actionsDefs[actionProp]);
                            if (action!==false){
                                actions[actionProp] = action;
                            }
                         }
                    }
                }
                cls.ixActions = proto.ixActions = actions;
            }

        }

    }

}, function () {
    var Meta = this;
    Meta.onExtended(function (cls, data) {
        var proto = cls.prototype;
        var superCls = proto.superclass.self;
        Meta._ixInitFields(data, cls, proto);
        Meta._ixInitActions(data, cls, proto);
    });
});
