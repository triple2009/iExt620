Ext.define('app.view.user.Search', {
    extend: 'iExt.form.Filter',
    xtype: 'app-user-search',

    title: '用户搜索',

    items: [{
        fieldLabel: '代码',
        reference: 'txtName',
        allowBlank: false
    }, {
        fieldLabel: '名称'
    }, {
        fieldLabel: 'Other 1'
    }, {
        fieldLabel: 'Other 2'
    }],

    ixFilters: {
        ixConnector: iExt.filter.Connectors.AND,
        ixItems: [{
            ixProperty: 'name',
            ixOperator: iExt.filter.Operators.CT,
            ixAlignTarget: 'txtName',
            type: 'string'
        }]
    }

});