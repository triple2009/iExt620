Ext.define('app.view.main.UserController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.user',

    onSelectionChange: function (selModel, selected, eOpts) {

    },

    onItemClick: function (view, record, item, index, e, eOpts) {
        view.grid.setVisible(false);
    },

    onAdd: function (btn, e, eOPts) {
        var view = this.getView();
        view.items.each(function(item,index){
            item.setVisible(false);
        });
        var add = view.add(Ext.create('app.view.user.Add', { title: 'test' }));
    }
});