Ext.define('app.view.user.Search', {
    extend: 'iExt.form.Search',
    xtype: 'app-user-search',

    title: '用户搜索',

    items: [{
        fieldLabe: '代码'
    }, {
        fieldLabe: '名称'
    }]
});