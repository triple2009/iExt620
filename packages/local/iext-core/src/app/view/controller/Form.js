/**
 * @class iExt.app.view.controller.Form
 * @extends {iExt.app.view.controller.Base} 
 * @classdesc iExt 表单视图控制器类。
 */
Ext.define('iExt.app.view.controller.Form', {
    extend: 'iExt.app.view.controller.Base',
    alias: 'controller.ixform',

    listen: {
        component: {
            '*': {
                /**
                 * 合法性验证事件。
                 */
                ixvaliditychange: 'ixOnValidityChange'
            }
        }
    },

    /**
     * 视图初始化后处理。
     * @memberOf iExt.app.controller.LFormst#
     * @param {Ext.Component} view 视图对象。
     * @param {Object} auths 授权信息。
     */
    ixOnViewInited: function (view, auths) {
        // <debug>
        iExt.log('表单控制器完成视图初始化', view.$className, view.getId());
        // </debug>

        var me = this,
            refs = view.getReferences();

        // 处理引用的组件
        for (var ref in refs) {
            if (refs.hasOwnProperty(ref)) {
                if (ref.ixIsFormView === true) {
                    if (ref.hasListeners.ixvaliditychange) {
                        // 如果存在事件监听，在事件处理前插入处理
                        ref.onBefore('ixvaliditychange', me.ixOnValidityChange, me);
                    } else {
                        // 添加选择事件处理
                        ref.addListener('ixvaliditychange', me.ixOnValidityChange, me);
                    }
                    var valid = ref.ixIsValid();
                    me.ixOnValidityChange(ref, valid);
                }
            }
        }

        // 处理当前视图
        if (view.ixIsFormView === true) {
            if (view.hasListeners.ixselection) {
                // 如果存在事件监听，在事件处理前插入处理
                view.onBefore('ixvaliditychange', me.ixOnValidityChange, me);
            } else {
                // 添加选择事件处理
                view.addListener('ixvaliditychange', me.ixOnValidityChange, me);
            }
            var valid = view.ixIsValid();
            me.ixOnValidityChange(view, valid);
        }
    },

    /**
     * 选择数据事件处理
     * @param {Ext.Component} form 表单组件。
     * @param {Boolean} valid 是否合法。
     */
    ixOnValidityChange: function (form, valid) {
        var ids = form._$ixAlignTargetIds || [];
        Ext.each(ids, function (id, index) {
            var cmp = Ext.getCmp(id);
            if (cmp && cmp.ixIsAction === true) {
                var align = cmp.getIxAlign();
                if (align) {
                    var data = form.ixGetFormData();
                    var b = align.ixIsEnabled(valid, [data]);
                    cmp.setDisabled(!b);
                }
            }
        });
    }

});