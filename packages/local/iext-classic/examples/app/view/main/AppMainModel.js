Ext.define('app.view.main.AppMainModel', {
    extend: 'iExt.app.ViewModel',

    alias: 'viewmodel.appmain',

    data: {
        hr: [{
            code: 'hr01',
            name: '组织管理'
        }, {
            code: 'hr02',
            name: '职员管理'
        }, {
            code: 'hr03',
            name: '薪资管理'
        }],
        oa: [{
            code: 'oa01',
            name: '公文管理'
        }, {
            code: 'oa02',
            name: '新闻管理'
        }, {
            code: 'oa03',
            name: '档案管理'
        }],
        tc: [{
            code: 'tc01',
            name: '课程体系'
        }, {
            code: 'tc02',
            name: '学员管理'
        }, {
            code: 'tc03',
            name: '讲师管理'
        }],
        crm: [{
            code: 'crm01',
            name: '房源管理'
        }, {
            code: 'crm02',
            name: '客源管理'
        }, {
            code: 'crm03',
            name: '合同管理'
        }],
        bz: [{
            code: 'bz01',
            name: '委托管理'
        }, {
            code: 'bz02',
            name: '委托手里'
        }, {
            code: 'bz03',
            name: '待办事项'
        }],
        fin: [{
            code: 'fin01',
            name: '帐套管理'
        }, {
            code: 'fin02',
            name: '凭证管理'
        }]
    }
});