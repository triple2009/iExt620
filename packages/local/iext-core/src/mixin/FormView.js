/**
 * @mixin iExt.mixin.FormView
 * @extends {iExt.mixin.View} 
 * @classdesc iExt 表单视图 MIXIN。
 */
Ext.define('iExt.mixin.FormView', {
    extend: 'iExt.mixin.View',

    mixinConfig: {
        id: 'iext-view-form',
        on: {
            afterRender: 'ixOnAfterRender'
        }
    },

    ixIsFormView: true,

    /**
     * 取消事件。
     * 关闭当前视图，可能是为获取到数据或者未经授权
     * @memberOf iExt.mixin.FormView#
     * @event ixcancel
     * @param {iExt.mixin.FormView} this iExt.mixin.FormView 控件。
     */

    /**
     * 获取表单数据
     */
    ixGetFormData: iExt.unimplFn,

    /**
     * 获取是否合法信息
     */
    ixIsValid: iExt.unimplFn,

    /**
     * 获取是否存在“脏数据”
     */
    ixIsDirty: iExt.unimplFn,

    /**
     * 刷新数据
     */
    ixRefresh: function (close) {
        // 数据经过处理并且成功后触发该事件
        // 可以通过此事件处理视图设置
        if (this.hasListeners.ixformchanged) {
            this.fireEvent('ixformchanged', this, close);
        }
    },

    // 添加Form事件进行处理
    ixAddListeners: function () {
        var me = this;
        me.on('validitychange', me._ixOnValidityChange, me);
    },

    privates: {

        /**
         * 触发数据验证事件
         */
        _ixOnValidityChange: function (item, valid) {
            if (this.hasListeners.ixvaliditychange) {
                this.fireEvent('ixvaliditychange', this, valid);
            }
        },

        /**
         * 添加事件监听
         */
        _ixOnAfterRender: function () {
            var me = this;
            var valid = me.ixIsValid();
            me.ixAddListeners();
            me._ixOnValidityChange(me, valid);
        }

    }

});