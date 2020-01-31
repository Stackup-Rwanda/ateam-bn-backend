// const userDefinition = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     name: {
//       type: DataTypes.STRING
//     },
//     gender: {
//       type: DataTypes.STRING
//     },
//     email: {
//       type: DataTypes.STRING
//     },
//     username: {
//       type: DataTypes.STRING
//     },
//     password: {
//       type: DataTypes.STRING
//     },
//     birthdate: {
//       type: DataTypes.DATE
//     },
//     preferredLanguage: {
//       type: DataTypes.STRING
//     },
//     preferredCurrency: {
//       type: DataTypes.STRING
//     },
//     location: {
//       type: DataTypes.STRING
//     },
//     role: {
//       type: DataTypes.STRING
//     },
//     department: {
//       type: DataTypes.STRING
//     },
//     lineManager: {
//       type: DataTypes.STRING
//     },
//     createdAt: {
//       type: DataTypes.DATE
//     },
//     updatedAt: {
//       type: DataTypes.DATE
//     }
//   }, {});
//   // eslint-disable-next-line no-unused-vars
//   User.associate = (models) => {
//     // associations can be defined here
//   };
//   return User;
// };

// export default userDefinition;
import Sequelize from 'sequelize';
import db from '../config/db';

const User = db.define('User', {
  name: {
    type: Sequelize.STRING
  },
  gender: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  birthdate: {
    type: Sequelize.DATE
  },
  preferredLanguage: {
    type: Sequelize.STRING
  },
  preferredCurrency: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  },
  department: {
    type: Sequelize.STRING
  },
  lineManager: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE
  },
  updatedAt: {
    type: Sequelize.DATE
  },
  google_id:{type:Sequelize.STRING,
  unique:true},
  fb_id:{
    type:Sequelize.STRING,
    unique:true,
  }
});
  
export default User;