/**
 * @class iExt.align.Form
 * @classdesc 用户操作动作组件表单对齐类。
 */
Ext.define('iExt.align.Form', {
    extend: 'iExt.align.Base',
    alias: 'ixalign.form',

    /**
     * 是否可用
     * @param {Boolean} isValid 数据是否有效
     * @param {Ext.data.Model[]} data 数据
     */
    ixIsEnabled: function (isValid, data) {
        var me = this, enabled = true, mode = me.getIxMode();

        // 未指定数据验证，直接返回 true
        if (mode === null) {
            return true;
        }

        // 未指定参数，直接返回 false
        if (arguments.length === 0) {
            return false;
        }

        // 如果要求数据有效，而实际无效，直接返回 false
        if (mode === true && isValid === false) {
            return false;
        }

        var fn = me.getIxEnabledWhen();
        if (fn) {
            for (var i = 0; i < data.length; i++) {
                enabled = fn(data[i]);
                if (!enabled) { break; }
            }
        }
        return enabled;
    }

});