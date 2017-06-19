/**
 * @class iExt.form.field.LookupField
 * @extends {Ext.form.field.Text}
 * @classdesc iExt 参照文本框。
 */
Ext.define('iExt.form.field.LookupField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.ixlookupfield',

    cls: 'ix-lookup-field',

    config: {
        ixView: undefined,
        ixAllowBlank: false,
        ixMultiSelect: false,
        ixFields: undefined
    },

    ixDelimiter: ',',

    initComponent: function () {
        var me = this,
            triggers = {
                lookup: {
                    cls: 'x-fa fa-ellipsis-h',
                    handler: me.ixOnLookup.bind(me)
                }
            };

        if (me.getIxAllowBlank()) {
            triggers.clear = {
                cls: 'x-fa fa-remove',
                handler: me.ixClearValue.bind(me)
            };
        }

        me.setTriggers(triggers);
        me.callParent(arguments);
    },

    ixOnLookup: function (field, trigger, e) {
        var me = this,
            view = this.getIxView(),
            multi = me.getIxMultiSelect();
        if (view) {
            var target = iExt.app.view.ViewTarget.LOOKUP;
            me.fireEvent('ixopenview', me, target, view, {
                ixMultiSelect: multi
            });
        }
        e.stopPropagation();
    },

    ixSetValue: function (data) {
        var me = this,
            i = 0,
            j = 0,
            multi = me.getIxMultiSelect(),
            fields = me.getIxFields();

        //<debug>
        if (!fields) {
            Ext.raise('LookupField：未指定参照的属性信息！');
            return;
        }
        //</debug>
        if (Ext.isString(fields)) {
            fields = [{
                ixName: me.name,
                ixProperty: fields
            }];
        }
        var vals = {};
        for (i = 0; i < fields.length; i++) {
            var field = fields[i];
            var propVals = '';
            for (j = 0; j < data.length; j++) {
                if (j > 0) {
                    if (multi === true) {
                        propVals += me.ixDelimiter;
                    } else {
                        break;
                    }
                }
                propVals += data[j].data[field.ixProperty];
            }
            vals[field.ixName] = propVals;
        }
        var parent = me.findParentByType('panel');
        if (!parent) {
            Ext.raise('LookupField：未能找到参照控件所在的Panel！');
            return;
        }
        var p, items;
        for (p in vals) {
            if (vals.hasOwnProperty(p)) {
                items = parent.query('[name=' + p + ']');
                if (items.length === 0) {
                    Ext.raise('LookupField：未能找到 name=' + p + ' 的控件！');
                    return;
                }
                for (i = 0; i < items.length; i++) {
                    if (items[i].setValue) {
                        items[i].setValue(vals[p]);
                    }
                }
            }
        }
    },

    ixClearValue: function () {
        var me = this,
            fields = me.getIxFields || [];

        if (Ext.isString(fields)) {
            fields = [{
                ixName: me.name,
                ixProperty: fields
            }];
        }

        if (fields.length > 0) {
            fields.forEach(function (field) {
                var cmp = me.up().query('[name=' + field.ixName + ']')[0];
                if (cmp && cmp.setValue) {
                    cmp.setValue(null);
                }
            });
        } else {
            me.setValue(null);
        }

        if (me.hasListeners.ixdataclear) {
            me.fireEvent('ixdataclear', this);
        }
    },

    onDestroy: function () {
        this.callParent();
        Ext.destroyMembers(this, '__ixWin');
    }

});