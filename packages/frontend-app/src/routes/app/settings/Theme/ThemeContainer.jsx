import React from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Theme from './Theme';
import MeHoc from '../../../../hComponents/Me';

const UPDATE_SETTING = gql`
    mutation updateOrganizationSetting(
        $organizationId: Int!
        $name: String!
        $value: String!
    ) {
        updateOrganizationSetting(
            organizationId: $organizationId
            name: $name
            value: $value
        ) {
            name
            value
        }
    }
`;

const GET_ORGANIZATION_SETTINGS = gql`
    query OrganizationSettings($organizationId: Int!) {
        organization(organizationId: $organizationId) {
            settings {
                name
                value
            }
        }
    }
`;

const ThemeContainer = props => (
    <Query
        query={GET_ORGANIZATION_SETTINGS}
        variables={{
            organizationId: props.selectedOrganization.id,
        }}
    >
        {({ loading, error, data }) => (
            <Mutation
                mutation={UPDATE_SETTING}
                update={(cache, { data: { updateOrganizationSetting } }) => {
                    const { organization } = cache.readQuery({
                        query: GET_ORGANIZATION_SETTINGS,
                        variables: {
                            organizationId: props.selectedOrganization.id,
                        },
                    });

                    const index = organization.settings.findIndex(
                        os => os.name === updateOrganizationSetting.name
                    );

                    let newSettings = [...organization.settings];

                    if (index === -1) {
                        newSettings.push(updateOrganizationSetting);
                    } else {
                        newSettings = newSettings.map(s =>
                            s.name === updateOrganizationSetting.name
                                ? updateOrganizationSetting
                                : s
                        );
                    }

                    cache.writeQuery({
                        query: GET_ORGANIZATION_SETTINGS,
                        data: {
                            organization: {
                                ...organization,
                                settings: newSettings,
                            },
                        },
                        variables: {
                            organizationId: props.selectedOrganization.id,
                        },
                    });
                }}
            >
                {updateOrganizationSetting => (
                    <Theme
                        {...props}
                        loading={loading}
                        error={error}
                        settings={
                            data && data.organization
                                ? data.organization.settings
                                : []
                        }
                        updateSetting={(name, value) =>
                            updateOrganizationSetting({
                                variables: {
                                    organizationId:
                                        props.selectedOrganization.id,
                                    name,
                                    value,
                                },
                            }).then(() => props.onSaveDone())
                        }
                    />
                )}
            </Mutation>
        )}
    </Query>
);

ThemeContainer.defaultProps = {
    onSaveDone: () => {},
};

export default MeHoc()(ThemeContainer);
