/**
 * @class iExt.form.field.LookupField
 * @extends {Ext.form.field.Picker}
 * @classdesc iExt 参照文本框。
 */
Ext.define('iExt.form.field.LookupField', {
    extend: 'Ext.form.field.Picker',
    alias: 'widget.ixlookupfield',

    cls: 'ix-lookup-field',

    config: {
        /**
         * 参照视图
         */
        ixView: null,
        /**
         * 视图规格
         */
        ixScale: 'normal'
    },

    ixDelimiter: ',',

    defaultListConfig: {
        cls: 'ix-picker'
    },

    initComponent: function () {
        var me = this;
        if (me.readOnly !== true) {
            var triggers = {
                lookup: {
                    cls: 'x-fa fa-ellipsis-h',
                    handler: me.ixOnLookup.bind(me)
                }
            };
            me.setTriggers(triggers);
        }
        me.callParent(arguments);
    },

    ixOnLookup: function (field, trigger, e) {
        var me = this,
            view = this.getIxView(),
            multi = me.getIxMultiSelect();
        if (view) {
            var target = iExt.app.view.ViewTarget.MAIN;
            me.fireEvent('ixopenview', me, target, view, {
                ixMultiSelect: multi
            });
        }
        e.stopPropagation();
    },

    privates: {

        /**
         * 数据选择事件处理
         */
        _ixOnSelection: function (sm, records) {
            if (!records || !Ext.isArray(records)) {
                return;
            }
            if (records.length === 0) {
                return;
            }
            var me = this,
                record = records[0],
                valueField = me.getIxValueField(),
                displayFields = me.getIxDisplayFields() || [],
                multi = me.getIxMulti();

            var vals = '',
                disp = '',
                disps = {};

            Ext.each(records, function (record) {
                vals += record.get(valueField) + me.ixDelimiter;
                Ext.each(displayFields, function (field) {
                    //<debug>
                    if (!field.dataIndex) {
                        Ext.raise('未指定显示属性的 dataIndex ！');
                        return;
                    }
                    if (!field.ref) {
                        Ext.raise('未指定显示属性的 ref ！');
                        return;
                    }
                    //</debug>
                    disp = record.get(field.dataIndex) || '';
                    disps[field.ref] = disps[field.ref] || '';
                    disps[field.ref] += disp + me.ixDelimiter;
                });
            });
            vals = vals.substr(0, vals.length - 1);
            me.setValue(vals);

            // 设置显示属性值
            var refHoder = me.lookupReferenceHolder(true);
            //<debug>
            if (!refHoder) {
                Ext.raise('未找到 ReferenceHolder ！');
                return;
            }
            var refs = refHoder.getReferences();
            //</debug>
            for (p in disps) {
                if (disps.hasOwnProperty(p)) {
                    var ref = refs[p];
                    //<debug>
                    if (!ref) {
                        Ext.raise('未找到引用的控件 [' + p + '] ！');
                        return;
                    }
                    vals = disps[p];
                    vals = vals.substr(0, vals.length - 1);
                    ref.setValue(vals);
                }
            }

        }
    }
});