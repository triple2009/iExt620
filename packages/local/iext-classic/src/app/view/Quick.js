/**
 * @class iExt.app.view.Quick
 * @extends {Ext.form.Panel} 
 * @classdesc 快速查看表单。
 */
Ext.define('iExt.app.view.Quick', {
    extend: 'Ext.form.Panel',
    alias: 'widget.ixqvform',

    cls: 'ix-quick-form',

    header: false,
    scrollable: 'y',
    defaultType: 'ixdisplay',
    bodyPadding: '5 5 5 5',

    fieldDefaults: {
        labelAlign: 'top'
    },

    config: {
        /**
         * 实体模型类名称
         */
        ixModelName: null,

        /**
         * 仓储标识
         */
        ixId: null,

        /**
         * 实体数据
         * 如果提供数据，则以数据展示
         * 否则根据 ixModelName 和 ixId 加载数据
         */
        ixModelData: null
    },

    /**
     * 空文本替代字符：&#160; or &nbsp;
     */
    ixEmptyText: '&#160;',

    initComponent: function () {
        var me = this,
            model,
            data = me.getIxModelData();

        if (data) {
            model = data.$className;
        } else {
            model = me.getIxModelName();
        }

        me._ixMeta = iExt.meta.Manager.ixGetMeta(model);

        if (!me.title) {
            var title;
            // 缺省使用 model 的名称
            var names = model.split('.');
            title = names[names.length - 1];

            if (me._ixMeta) {
                title = me._ixMeta.ixName || title;
            }
            me.title = '快速查看－' + title;
        }
        me.callParent();
    },

    /*
    afterRender: function () {
        var me = this,
            ixmodel = me.getIxModel(),
            id = me.getIxId();

        if (ixmodel && id) {
            var model = Ext.create(ixmodel);
            var mask = new Ext.LoadMask({
                msg: '加载中...',
                target: me
            });
            mask.show();

            model.self.load(id, {
                callback: function (record, operation, success) {
                    if (success) {
                        if (me.ixHasMeta === true) {
                            me._ixSetMetaView(model.self.ixMeta, record);
                        } else {
                            me._ixSetView(record);
                        }
                    }
                    mask.destroy();
                }
            });
        }
        me.callParent();
    },
    */

    privates: {

        _ixMeta: null,

        _ixSetView: function (record) {
            var me = this, value, data = record.data;
            for (var p in data) {
                if (data.hasOwnProperty(p)) {
                    value = data[p] || me.ixEmptyText;
                    value = value === '' ? me.ixEmptyText : value;

                    me.add({
                        ixQuick: true,
                        fieldLabel: p,
                        value: value
                    });
                }
            }
        },

        _ixSetMetaView: function (meta, record) {
            var me = this, label, value, data = record.data;
            Ext.each(meta.ixFields, function (field) {
                if (field.ixWeight === 0) {
                    return;
                }

                label = field.ixLabel;
                if (!label) { label = field.ixTitle; }

                value = data[field.ixName];
                if (value) {
                    value = field.ixFormat(value);
                } else {
                    value = me.ixEmptyText;
                }
                value = value === '' ? me.ixEmptyText : value;

                me.add({
                    ixQuick: true,
                    fieldLabel: label,
                    value: value
                });
            });
        }

    }

});
