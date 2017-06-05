/**
 * @class iExt.action.View
 * @extends {iExt.action.Base}
 * @classdesc 打开操作操作动作类。
 */
Ext.define('iExt.action.View', {
    extend: 'iExt.action.Base',
    alias: 'ixaction.view',

    requires: [
        'iExt.action.ViewTarget'
    ],

    config: {
        /**
         * 打开视图目标
         */
        ixTarget: iExt.action.ViewTarget.MAIN
    },

    /**
     * 视图类名称
     * 视图的xtype名称，或者完全类名称
     */
    ixViewName: null,

    /**
     * 视图配置
     */
    ixConfig: null,

    /**
     * 根据字符串解析枚举值
     */
    applyIxTarget: function (target) {
        if (Ext.isString(target)) {
            target = iExt.action.ViewTarget.ixGetValue(target);
        }
        return target;
    },

    /**
     * 是否可用
     */
    ixIsEnabled: function () {
        return this.getIxView() !== undefined;
    },

    /**
     * 执行动作
     */
    ixDo: function (item, align, data) {
        // iExt.Msg.ixInfo(me.getIxName() + '-' + me.getIxView());
        var action = this;
        var close = action.getIxClose();
        if (close === true && item.ixAlignView) {
            // 关闭当前窗口
            var win = item.ixAlignView.ownerCt;
            if (win.isWindow === true) {
                win.close();
            }
        }
        if (Ext.isArray(data)) {
            data = data[0];
        }
        iExt.action.View.ixOpenView(item, action, data);
    },

    statics: {

        /**
         * 打开视图
         */
        ixOpenView: function (item, action, data) {
            var name = action.getIxName(),
                view = action.getIxView(),
                config = action.getIxConfig() || {},
                params = action.getIxParams() || {};

            if (!view) {
                var service = action.getIxService() || '',
                    code = action.getIxCode() || '';
                view = service + '-' + code;
            }
            if (data) {
                Ext.apply(params, {
                    ixId: data.get('id')
                });
            }
            Ext.apply(config, {
                ixParams: params
            });
            var target = action.getIxTarget();
            item.fireEvent('ixopenview', item, target, view, config);
        }
    }

});