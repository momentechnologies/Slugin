const OrganizationUserNotificationSettingModel = require('../../../db')
    .OrganizationUserNotificationSetting;

module.exports.schema = `
  type Mutation {
    updateOrganizationUserNotification(organizationId: Int!, userId: Int!, settings: [updateOrganizationUserNotification]!): [OrganizationUserNotification]
  }
  
  input updateOrganizationUserNotification {
    notificationName: String
    notificationType: String
    canSend: Boolean
  }
  
  type OrganizationUserNotification {
    id: Int
    userId: Int
    organizationId: Int
    notificationName: String
    notificationType: String
    canSend: Boolean
  }
`;

module.exports.resolvers = {
    Mutation: {
        updateOrganizationUserNotification: async (
            parent,
            { organizationId, userId, settings }
        ) => {
            let savedSettings = [];

            for (let x = 0; x < settings.length; x++) {
                const setting = settings[x];

                let dbSetting = await OrganizationUserNotificationSettingModel.findOne(
                    {
                        where: {
                            organizationId,
                            userId,
                            notificationName: setting.notificationName,
                            notificationType: setting.notificationType,
                        },
                    }
                );

                if (!dbSetting) {
                    dbSetting = await OrganizationUserNotificationSettingModel.create(
                        {
                            organizationId,
                            userId,
                            notificationName: setting.notificationName,
                            notificationType: setting.notificationType,
                            canSend: setting.canSend,
                        }
                    );
                } else {
                    await dbSetting.update({
                        canSend: setting.canSend,
                    });
                }

                savedSettings.push(dbSetting);
            }

            return savedSettings;
        },
    },
    OrganizationUser: {
        notifications: async ({ organizationId, userId }) => {
            return await OrganizationUserNotificationSettingModel.findAll({
                where: {
                    organizationId,
                    userId,
                },
            });
        },
    },
};
