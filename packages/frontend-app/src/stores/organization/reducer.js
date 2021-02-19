import { genericReducer } from '../../helpers/stores/genericReducer';
import types from './constants';
import meTypes from '../me/constants';

const initialState = {
    selectedOrganization: null,
    myOrganizations: [],
};

export default (state = initialState, action) =>
    genericReducer('organization', state, action, (state, action) => {
        switch (action.type) {
            case meTypes.LOGGED_IN:
                return {
                    ...state,
                    selectedOrganization:
                        action.payload.organizations.length !== 0
                            ? action.payload.organizations[0].id
                            : null,
                    myOrganizations: action.payload.organizations,
                };
            case types.CHANGE_ORGANIZATION_ID:
                return {
                    ...state,
                    selectedOrganization: action.payload.organizationId,
                };
            case types.UPDATE_ORGANIZATION:
                return {
                    ...state,
                    myOrganizations: [...state.myOrganizations].map(o =>
                        o.id === action.payload.organization.id
                            ? action.payload.organization
                            : o
                    ),
                };
            default:
                return state;
        }
    });
