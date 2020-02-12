const dateString = new Date((new Date()).getTime() + (10 * 86400000));

export const oneWayTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2, 1],
  date: dateString,
  reasons: 'being a you director',
  accommodationId: 1,
};
export const incopreteWayTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2],
  date: new Date(),
  accommodationId: 1,
};
export const incoDateWayTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2],
  date: '2020-02-02',
  accommodationId: 1,
};
export const incoloacationWayTrip = {
  tripType: 'One-way',
  from: 30000,
  to: [10000],
  date: dateString,
  accommodationId: 1,
};

export const incoAccommodationWayTrip = {
  tripType: 'One-way',
  from: 30000,
  to: [10000],
  date: new Date(),
  accommodationId: 1000,
};

export const twoWayTrip = {
  tripType: 'Return',
  from: 1,
  to: [2, 1],
  date: new Date(),
  returnDate: new Date((new Date()).getTime() + (20 * 86400000)),
  reasons: 'being a director',
  accommodationId: 1,
};

export const invalideDateTrip = {
  tripType: 'Return',
  from: 1,
  to: [2, 1],
  date: new Date(),
  returnDate: new Date((new Date()).getTime() + (20 * 86400000)),
  reasons: 'being a director',
  accommodationId: 1,
};
