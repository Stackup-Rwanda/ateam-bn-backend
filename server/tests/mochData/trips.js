const dateString = new Date((new Date()).getTime() + (10 * 86400000));

export const oneWayTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2],
  date: dateString,
  reasons: 'being a you director',
  accommodationId: 2,
};
export const incopreteWayTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2],
  date: new Date(),
  accommodationId: 2,
};
export const incoDateWayTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2],
  date: '2020-02-02',
  accommodationId: 2,
};
export const incoloacationWayTrip = {
  tripType: 'One-way',
  from: 30000,
  to: [10000],
  date: dateString,
  accommodationId: 2,
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
  to: [2],
  date: dateString,
  returnDate: new Date((new Date()).getTime() + (20 * 86400000)),
  reasons: 'being a director',
  accommodationId: 2,
};

export const invalideDateTrip = {
  tripType: 'Return',
  from: 1,
  to: [2, 3],
  date: new Date(),
  returnDate: new Date((new Date()).getTime() + (20 * 86400000)),
  reasons: 'being a director',
  accommodationId: 1,
};

export const jajaTrip = {
  tripType: 'One-way',
  from: 1,
  to: [2],
  date: dateString,
  reasons: 'Test jaja one way trip',
  accommodationId: 2,
};

export const twoWayTripMultipleCity = {
  tripType: 'Multi-city',
  from: 1,
  to: [2, 3],
  date: dateString,
  returnDate: new Date((new Date()).getTime() + (20 * 86400000)),
  reasons: 'visting a director',
  accommodationId: 2,
};
