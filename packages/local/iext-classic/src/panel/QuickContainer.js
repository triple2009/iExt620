/**
 * @class iExt.panel.QuickContainer
 * @extends {Ext.panel.Panel} 
 * @classdesc 快速查看视图容器。
 */
Ext.define('iExt.panel.QuickContainer', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.ixquickcontainer',

    requires: [],

    cls: 'ix-quick-container',
    bodyCls: 'ix-quick-container-body',
    title: '快速查看',

    viewModel: {
        data: {
            title: '',
            subTitle: ''
        }
    },

    initComponent: function () {
        var me = this;
        me.dockedItems = [];

        me.dockedItems.push({
            xtype: 'ixviewheader',
            items: [{
                xtype: 'ixviewtitle',
                bind: {
                    html: '{title}'
                }
            }, '->', {
                iconCls: 'x-fa fa-chevron-right',
                listeners: {
                    click: function (item, e, opts) {
                        item.up('panel').hide();
                    }
                }
            }]
        });

        me.dockedItems.push({
            xtype: 'ixviewheader',
            items: [{
                xtype: 'ixviewtitle',
                flex: 1,
                bind: {
                    html: '{subTitle}'
                }
            }, {
                xtype: 'ixtbrholder'
            }]
        });

        me.on('add', me._ixOnAdd);
        me.callParent();
    },

    setTitle: function (title) {
        var me = this,
            vm = me.getViewModel();
        vm.set({ title: title });
        me.callParent();
    },

    privates: {

        _ixOnAdd: function (panel, component, index, eOpts) {
            if (component.isComponent === true && component.getTitle) {
                var me = this,
                    vm = me.getViewModel(),
                    title = component.getTitle();
                vm.set({ subTitle: title });
            }
        }
    }

});