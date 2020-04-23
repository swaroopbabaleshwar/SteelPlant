
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
    }
}


export default RESTAPI;
