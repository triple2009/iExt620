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
        var me = this,
            enabled = true,
            mode = me.getIxMode();

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
                if (!enabled) {
                    break;
                }
            }
        }
        return enabled;
    },

    /**
     * 获取需要处理的数据
     * 需要根据对齐的组件标识获取相应的数据
     * @return {Object[]} 
     */
    ixGetAlignData: function () {
        var me = this,
            id = me.getIxTargetId();
        // <debug>
        if (!id) {
            iExt.log('列表对齐操作', '对齐的组件标识未定义！');
            return null;
        }
        // </debug>
        var mode = me.getIxMode(),
            view = Ext.getCmp(id);
        if (view.ixIsListView === true) {
            if (mode !== null) {
                var data = view.ixGetSelectedData();
                if (!data || data.length === 0) {
                    Ext.raise('请选择要处理的数据！');
                    return null;
                }
            }
            return data;
        }
        return null;
    }

});