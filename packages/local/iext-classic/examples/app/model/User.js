Ext.define('app.model.User', {
    extend: 'iExt.model.Aggregate',

    ixApiConfig: {
        ixAppId: 'huc',
        ixApis: [
            { ixCode: 'resetPassword', ixMethod: 'PUT' },
            { ixCode: 'active', ixMethod: 'PUT' },
            { ixCode: 'inactive', ixMethod: 'PUT' }
        ]
    },

    fields: [{
        name: 'code',
        type: 'string'
    }, {
        name: 'name',
        type: 'string'
    }, {
        name: 'password',
        type: 'string'
    }, {
        name: 'pwdModifiedOn',
        type: 'date'
    }, {
        name: 'email',
        type: 'string'
    }, {
        name: 'status',
        type: 'string',
        defaultValue: 1
    }, {
        name: 'statusName',
        type: 'string'
    }, {
        name: 'mobile',
        type: 'string'
    }, {
        name: 'birthday',
        type: 'date'
    }, {
        name: 'age',
        type: 'number'
    }]
});