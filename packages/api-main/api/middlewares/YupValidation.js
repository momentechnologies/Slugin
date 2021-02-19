const yup = require('yup');
const ValidationException = require('../exceptions/validation');

module.exports = {
    async Mutation(resolve, root, args, context, info) {
        const mutationField = info.schema.getMutationType().getFields()[
            info.fieldName
        ];

        const mutationValidationSchema = mutationField.validationSchema;

        let values = {};

        if (mutationValidationSchema) {
            try {
                values = await mutationValidationSchema.validate(args, {
                    abortEarly: false,
                });
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    throw new ValidationException(
                        error.inner.map(error =>
                            ValidationException.createError(
                                error.path,
                                'params',
                                error.message
                            )
                        )
                    );
                } else {
                    throw error;
                }
            }
        }

        return resolve(
            root,
            {
                ...args,
                ...values,
            },
            context,
            info
        );
    },
};
