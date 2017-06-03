/**
 * @class iExt.meta.Domain
 * @extends {Ext.Base} 
 * @classdesc 领域类。
 * 用于定义领域的模型、元数据、领域服务、领域视图信息。
 */
Ext.define('iExt.meta.Domain', {
    alternateClassName: 'iExt.Domain',

    requires: [],

    /**
     * 领域代码，例如：user
     */
    ixCode: null,

    /**
     * 领域中文名称，例如：用户
     */
    ixName: null,

    /**
     * 聚合根元数据类名称
     */
    ixMetaClass: null,

    /**
     * 操作集合对象，例如：新建、修改、审核等
     * {add: '新建', edit: '编辑', ...}
     */
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
        },
        _search: {
            type: 'view',
            ixName: '搜索',
            //ixTarget: iExt.app.view.ViewTarget.SEARCH,
            ixIconCls: 'x-fa fa-search'
        }
    },

    privates: {

        statics: {

            _ixInitActions: function (data, cls, proto) {
                var actionsDefs = data.ixActions;
                var superActions = proto.ixActions;
                var i, length, actionProp, action;

                var actions = {};
                if (superActions) {
                    for (actionProp in superActions) {
                        if (superActions.hasOwnProperty(actionProp)) {
                            action = Ext.clone(superActions[actionProp]);
                            if (action !== false) {
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
                            if (action !== false) {
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
    var Domain = this;
    Domain.onExtended(function (cls, data) {
        var proto = cls.prototype;
        var superCls = proto.superclass.self;
        Domain._ixInitActions(data, cls, proto);
    });
});