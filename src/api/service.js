
import API from './config';
import Rest from './rest';


const addHeaders = (params = {}) => {
    params['Origin'] = 'http://aic-arm.azurewebsites.net/';
    return params;
}

const RESTAPI = {
    getDeviceaTypes: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/Get';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    addDeviceType: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/Create';
        params.method = 'POST';
        addHeaders(params);

        return Rest(params);        
    },
    editDeviceType: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/Update';
        params.method = 'POST';
        addHeaders(params);

        return Rest(params);
    },
    deleteDeviceType: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/DeleteConfirmed';
        params.method = 'POST';
        addHeaders(params);

        return Rest(params);
    },
    getDeviceParameters: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/GetFieldDefinitions';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    editDeviceParameter: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/UpdateFieldDefinition';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    addDeviceparameters: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/AddFieldDefinition';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    getFieldTypes: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/GetFieldTypes';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    deleteDeviceParameter: (params = {}) => {
        params.url = API.DEVICE.DEVICETYPES + '/DeleteFieldDefinition';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    addFieldType: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/AddFieldType';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    editFieldTyoe: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/UpdateFieldType';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    deleteFieldType: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/DeleteFieldType';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    getProjectData: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/Get';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    editProjectData: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/Update';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    addProjectData: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/Create';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    deleteProjectData: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/DeleteConfirmed';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    getProjectFields: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/GetFieldValues';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    editProjectFields: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/UpdateFieldValue';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    moveUp: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/MoveUp';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    moveDown: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/MoveDown';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    exportProjectData: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/ProjectDatas/Export';
        params.method = 'GET';
        params.headers = {
            // 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            // responseType: 'blob'
            'content-type': 'application/vnd.ms-excel;charset=UTF-8',
            'responseType': 'application/vnd.ms-excel'
        }
        addHeaders(params);

        return Rest(params);
    },
    getProducts: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/GetProducts';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    editProducts: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/UpdateProduct';
        params.method = 'GET';
        addHeaders(params);

        return Rest(params);
    },
    deleteProduct: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/DeleteProduct';
        params.method = 'GET';
        addHeaders(params);
        
        return Rest(params);
    },
    addProduct: (params = {}) => {
        params.url = API.DEVICE.DOMAIN + '/Home/AddProduct';
        params.method = 'GET';
        addHeaders(params);
        
        return Rest(params);
    }
}


export default RESTAPI;
