export const selectedOrganization = state =>
    state.organization.myOrganizations.find(
        o => o.id === state.organization.selectedOrganization
    );
