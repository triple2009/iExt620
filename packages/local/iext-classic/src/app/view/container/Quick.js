/**
 * @class iExt.app.view.container.Quick
 * @extends {iExt.app.view.container.Base} 
 * @classdesc 快速查看视图容器。
 */
Ext.define('iExt.app.view.container.Quick', {
    extend: 'iExt.app.view.container.Base',
    alias: 'widget.ixquickcontainer',

    requires: [],

    cls: 'ix-quick-container',
    bodyCls: 'ix-quick-container-body',

    ixDefaultTitle: '快速查看',

    initComponent: function () {
        var me = this;
        me.tbar = {
            xtype: 'toolbar',
            items: [{
                xtype: 'ixtbrtitle',
                bind: {
                    html: '{title}'
                }
            }, '->', {
                iconCls: 'x-fa fa-chevron-right',
                listeners: {
                    click: { fn: me._ixOnHide, scope: me }
                }
            }]
        };
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

        _ixOnHide: function (item, e, eOpts) {
            this.hide();
        },

        _ixOnAdd: function (panel, component, index, eOpts) {
            if (component.isComponent === true && component.getTitle) {
                var me = this,
                    title = component.getTitle();
                me.setTitle(title);
            }
        }
    }

});