const BookingDefinition = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Bookings', {
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bookedBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    from: {
      type: DataTypes.DATE,
      allowNull: false
    },
    to: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  Booking.associate = (models) => {
    Booking.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'Room',
      onDelete: 'CASCADE'
    });
    return Booking;
  };
  return Booking;
};

export default BookingDefinition;
