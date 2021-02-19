import { select } from '../../helpers/stores/genericSelectors';

export const selectOrganizationCards = (state, organizationId, params = {}) =>
    select('card', state, `/organizations/${organizationId}/cards`, params);
