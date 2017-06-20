/**
 * @class iExt.app.view.controller.Base
 * @extends {Ext.app.ViewController} 
 * @classdesc iExt 视图控制器基础类。
 */
Ext.define('iExt.app.view.controller.Base', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ixbase',

    config: {
        /**
         * 需要进行授权控制的业务服务（集合）
         * {Array|String}
         */
        ixServices: null
    },

    /**
     * 缺省的标识参数名称
     */
    ixIdProperty: 'ixId',

    /**
     * 获取参数标识的快捷方式
     */
    ixGetId: function () {
        return this.ixGetParamValue(this.ixIdProperty);
    },

    /**
     * 获取参数对象
     */
    ixGetParams: function () {
        var view = this.getView();
        if (view.ixIsView === true) {
            return view.getIxParams();
        }
        return undefined;
    },

    /**
     * 获取参数值
     * @param {Stirng} paramName 参数名称
     */
    ixGetParamValue: function (paramName) {
        var params = this.ixGetParams();
        if (params) {
            return params[paramName];
        }
        return undefined;
    },

    /**
     * 获取用户操作组件集合
     */
    ixGetActionItems: function () {
        return this._ixActionItems;
    },

    /**
     * 用户授权处理。
     * @memberOf iExt.app.controller.Base#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnSetUserAuth: function (view, auths) {
        var items = this.ixActionItems();
        Ext.each(items, function (item) {
            item.ixSetUserAuth(auths);
        });
    },

    /**
     * 视图初始化后处理。
     * @memberOf iExt.app.controller.Base#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnViewInited: function (view, auths) {

    },

    /**
     * 重载初始化（init）事件处理。绑定事件处理。
     * @memberOf iExt.app.controller.Base#
     * @param {Ext.Component} view 视图对象。
     */
    init: function (view) {
        var me = this;

        // 初始化视图控制器，例如绑定事件等
        me._ixInitController(view);
        // 视图已经渲染后，进行获取操作项和权限验证
        view.onAfter('afterrender', me._ixInit, me);

        me.callParent(arguments);
    },

    destroy: function () {
        var me = this;
        // <debug>
        iExt.log('控制器销毁', this.$className, this.getId());
        // </debug>
        me.callParent();
    },

    privates: {

        /**
         * 用户操作组件集合
         * 操作组件id、对齐的组件id
         * [{itemId: '', targetId:''}]
         */
        _ixActionItems: null,

        /**
         * 初始化视图控制器，例如绑定事件等
         * @param {Ext.Component} view 视图对象。
         */
        _ixInitController: function (view) {

        },

        /**
         * 内部初始化。
         * @memberOf iExt.app.controller.Base#
         * @private
         * @param {Ext.Component} view 视图对象。
         */
        _ixInit: function (view) {
            // 初始化用户操作组件集合
            this._ixInitActionItems(view);
            // 初始化用户授权
            this._ixInitUserAuth(view);
        },

        /**
         * 内部初始化用户操作组件集合信息。
         * @memberOf iExt.app.controller.Base#
         * @private
         * @param {Ext.Component} view 视图对象。
         */
        _ixInitActionItems: function (view) {
            var actItems = view.query('component[ixIsAction=true]');
            if (actItems.length === 0) {
                return;
            }
            var me = this,
                refs = me.getReferences();
            me._ixActionItems = [];
            Ext.each(actItems, function (item, index) {
                var itemId = item.getId(),
                    align = item.getIxAlign();
                // 如果设置了对齐信息
                if (align !== null) {
                    // 获取组件的对齐引用
                    var ref = align.getIxTarget() || '',
                        refId = '', refCmp;
                    if (ref === '') {
                        refCmp = view;
                    } else {
                        // 验证指定的引用组件是否存在
                        refCmp = refs[ref];
                        // <debug>
                        if (!refCmp) {
                            Ext.raise('引用的 [' + ref + '] 组件不存在！');
                            return false;
                        }
                        // </debug>
                    }
                    refId = refCmp.getId();
                    me._ixActionItems.push({
                        itemId: itemId,
                        targetId: refId
                    });

                    // 为组件添加与之对齐的操作组件标识
                    refCmp.ixAlignItemIds = refCmp.ixAlignItemIds || [];
                    refCmp.ixAlignItemIds.push(itemId);

                    // 为操作组件设置其对齐的组件标识
                    align.setIxTargetId(refId);
                }
            });
        },

        /**
         * 内部初始化用户的授权信息。
         * @memberOf iExt.app.controller.Base#
         * @private
         * @param {Ext.Component} view 视图对象。
         */
        _ixInitUserAuth: function (view) {
            // <debug>
            iExt.log('用户授权初始化', this.$className, this.getId());
            // </debug>

            var me = this,
                services = me.getIxServices(),
                bauth = services && iExt.aop.auth.Authorization.ixApiEnabled('ixGetUserAuth');

            if (bauth) {
                iExt.aop.auth.Authorization.ixApiCall('ixGetUserAuth',
                    services).then(
                    function (auths) {
                        me.ixOnSetUserAuth(view, auths);
                        me.ixOnViewInited(view, auths);
                    },
                    function (reason) {
                        Ext.raise(reason);
                    },
                    Ext.emptyFn,
                    me
                    ).done();
            } else {
                me.ixOnViewInited(view, null);
            }
        }

    }

});