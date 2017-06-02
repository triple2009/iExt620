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
        // 缺省排序列集合
        ixSorters: [],
        // 列元数据集合
        ixFields: [],
        ixModel: undefined
    },

    // 实体的中文名称
    ixName: undefined,
    // 缺省排序列集合
    ixSorters: [],
    // 列元数据集合
    ixFields: [],
    // 操作集合
    ixActions: {},
    // 仓储标识字段 (meta field)
    ixRepoId: undefined,
    // 实体标识字段 (meta field)
    ixEntityId: undefined,
    // 实体描述字段 (meta field)
    ixEntityDesc: undefined,

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

    // 添加列元数据信息
    ixAddField: function (field) {
        //this.ixFields = this.ixFields || [];
        //this.ixSorters = this.ixSorters || [];
        var meta = field.ixMeta;
        if (!meta) { return; }
        meta = Ext.clone(meta);
        var metaField, type = 'string';
        if (field.isDateField === true) {
            type = 'date';
        } else if (field.isBooleanField === true) {
            type = 'boolean';
        } else if (field.isIntegerField === true) {
            type = 'integer';
        } else if (field.isNumberField === true) {
            type = 'number';
        }

        Ext.apply(meta, { type: type, ixName: field.name });
        if (meta.ixDefaultSort) {
            this.ixSorters.push({
                ixName: meta.ixName,
                ixSortDir: meta.ixDefaultSort
            });
        }
        if (meta.ixIsRepoId === true) {
            this.ixRepoId = meta;
        }
        if (meta.ixIsEntityId === true) {
            this.ixEntityId = meta;
        }
        if (meta.ixIsEntityDesc === true) {
            this.ixEntityDesc = meta;
        }

        this.ixFields.push(iExt.meta.Field.create(meta));
    },
    // 根据名称获取列元数据信息
    ixGetField: function (name) {
        var fields = this.ixFields;
        var metaField;
        if (fields && fields.length > 0) {
            Ext.each(fields, function (field) {
                if (field.ixName === name) {
                    metaField = field;
                    return false;
                }
            });
        }
        return metaField;
    },

    statics: {

        // 按照权重排序
        ixSortByWeight: function (a, b) {
            // a is less than b by some ordering criterion return -1
            // a is greater than b by the ordering criterion return 1
            // a is equal to b by the ordering criterion return 0
            if (a.ixWeight < b.ixWeight) {
                return -1;
            } else if (a.ixWeight > b.ixWeight) {
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
                        if (field.ixDefaultSort) {
                            sorters.push({
                                ixName: field.ixName,
                                ixSortDir: field.ixDefaultSort
                            });
                        }
                        ixField = Field.create(field);
                        if (field.ixRepoId === true) {
                            cls.ixRepoId = proto.ixRepoId = ixField;
                        }
                        if (field.ixEntityId === true) {
                            cls.ixEntityId = proto.ixEntityId = ixField;
                        }
                        if (field.ixEntityDesc === true) {
                            cls.ixEntityDesc = proto.ixEntityDesc = ixField;
                        }
                        fields.push(ixField);
                    }
                }

                // 按照权重排序所有列
                fields.sort(iExt.Meta.ixSortByWeight);
                cls.ixFields = proto.ixFields = fields;
                cls.ixSorters = proto.ixSorters = sorters;
            },

            _ixInitActions: function (data, cls, proto) {
                var actionsDefs = data.ixActions;
                var superActions = proto.ixActions;
                var i, length, groupCode, groupDef, action;

                var actions = {};
                if (superActions) {
                    for (groupCode in superActions) {
                        if (superActions.hasOwnProperty(groupCode)) {
                            actions[groupCode] = Ext.clone(superActions[groupCode]);
                        }
                    }
                }

                if (actionsDefs) {
                    delete data.ixActions;
                    for (groupCode in actionsDefs) {
                        if (actionsDefs.hasOwnProperty(groupCode)) {
                            groupDef = actionsDefs[groupCode];
                            action = actions[groupCode];
                            if (action) { // super类存在操作组定义
                                var itemCode, itemDef, item,
                                    group = { ixItems: {} };

                                if (groupDef.ixName) {
                                    group.ixName = groupDef.ixName;
                                } else {
                                    group.ixName = action.ixName;
                                }

                                // 复制super类的操作组
                                for (itemCode in action.ixItems) {
                                    if (action.ixItems.hasOwnProperty(itemCode)) {
                                        group.ixItems[itemCode] = Ext.clone(action.ixItems[itemCode]);
                                    }
                                }

                                // 重载data定义的操作
                                for (itemCode in groupDef.ixItems) {
                                    if (groupDef.ixItems.hasOwnProperty(itemCode)) {
                                        itemDef = groupDef.ixItems[itemCode];
                                        item = group.ixItems[itemCode];
                                        if (item) {
                                            group.ixItems[itemCode] = Ext.apply(item, itemDef);
                                        } else {
                                            group.ixItems[itemCode] = itemDef;
                                        }
                                    }
                                }
                                actions[groupCode] = group;
                            } else {
                                actions[groupCode] = groupDef;
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
