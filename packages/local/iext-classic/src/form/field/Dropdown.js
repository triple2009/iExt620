/**
 * @class iExt.form.field.Dropdown
 * @extends {iExt.form.field.Picker} 
 * @classdesc iExt 筛选条件控件。
 */
Ext.define("iExt.form.field.Dropdown", {
    extend: "Ext.form.field.Picker",
    alias: "widget.ixddfield",

    triggerCls: Ext.baseCSSPrefix + 'form-arrow-trigger',
    matchFieldWidth: false,

    /**
     * 下拉组件
     */
    ixComponent: null,

    initComponent: function () {

        this.callParent();
    },

    /**
     * 重载创建下拉组件
     */
    createPicker: function () {
        if (this.ixComponent && !this.ixComponent.render) {
            var cfg = {
                renderTo: document.body,
                ixDropDownField: this,
                hidden: true,
                floating: true
            };
            if (this.matchFieldWidth === true) {
                cfg.width = this.getWidth();
            }
            this.ixComponent = new Ext.ComponentManager.create(
                Ext.apply(this.ixComponent, cfg), 'panel');
        }
        return this.ixComponent;
    }

});