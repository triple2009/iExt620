/**
 * @class iExt.align.List
 * @classdesc 用户操作动作组件列表对齐类。
 */
Ext.define('iExt.align.List', {
    extend: 'iExt.align.Base',
    alias: 'ixalign.list',

    /**
     * 是否可用
     * @param {Boolean} isMulti 是否多条数据
     * @param {Ext.data.Model[]} data 数据
     */
    ixIsEnabled: function (isMulti, data) {
        var me = this, enabled = true, mode = me.getIxMode();

        // 如果未指定对齐方式直接返回true
        if (mode === null) {
            return true;
        }

        if (arguments.length === 0) {
            return false;
        }

        // 如果未选择数据返回false
        if (!Ext.isArray(data) || data.length === 0) {
            return false;
        }

        // 如果单选，但是选择了多条数据返回false
        if (mode === false && data.length > 1) {
            return false;
        }

        // 如果设置了对齐函数，返回函数的处理结果
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