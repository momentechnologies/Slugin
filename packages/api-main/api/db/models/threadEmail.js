module.exports = (sequelize, DataTypes) => {
    const threadEmail = sequelize.define(
        'threadEmail',
        {
            threadId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            emailId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
        },
        { timestamps: false }
    );

    threadEmail.associate = function(models) {
        // associations can be defined here
    };

    return threadEmail;
};
