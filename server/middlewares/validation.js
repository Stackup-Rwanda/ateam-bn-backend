import Joi from '@hapi/joi';

const validationObj = (messages) => Joi.string().trim().required().messages(messages);

const signUp = (req, res, next) => {
  const schema = Joi.object({
    name: validationObj({
      'string.base': 'Invalid type, your name must be a string',
      'string.empty': 'Please enter your name'
    }),
    username: validationObj({
      'string.base': 'Invalid type, your username must be a string',
      'string.empty': 'Please enter your username'
    }),
    email: validationObj({
      'string.base': 'Invalid type, your email must be a string',
      'string.empty': 'Please enter your email',
      'string.email': 'Your email is invalid, please enter a valid email'
    }).email(),
    password: validationObj({
      'string.base': 'Invalid type, your password must be a string',
      'string.min': 'password must be at least 8 characters long',
      'string.empty': 'Please enter your password'
    }).min(8)
      .alphanum(),
    gender: validationObj({
      'string.base': 'Invalid type, your gender must be a string',
      'string.empty': 'Please enter your gender'
    }),
    birthdate: Joi.date()
      .iso()
      .required()
      .messages({
        'date.base': 'Birthdate must be a date',
        'date.format': 'your birthdate must be in the format YYYY-MM-DD'
      }),
    preferredLanguage: validationObj({
      'string.base': 'Invalid type, your preferred language must be a string',
      'string.empty': 'Please enter your prefeered language'
    }),
    preferredCurrency: validationObj({
      'string.base': 'Invalid type, your preferred currency must be a string',
      'string.empty': 'Please enter your preferred currency'
    }),
    location: validationObj({
      'string.base': 'Invalid type, your location must be a string',
      'string.empty': 'Please enter your location'
    }),
    role: validationObj({
      'string.base': 'Invalid type, your role must be a string',
      'string.empty': 'Please enter your role'
    }),
    department: validationObj({
      'string.base': 'Invalid type, your department must be a string',
      'string.empty': 'Please enter your department'
    }),
    lineManager: validationObj({
      'string.base': 'Invalid type, your line manager must be a string',
      'string.empty': 'Please enter your line manager'
    })
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message
    });
  }
  next();
};

export default signUp;
