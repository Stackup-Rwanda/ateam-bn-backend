import tripHelpers from '../helpers/tripHelpers';

const tripStats = async (req, res) => {
  try {
    const { role, id } = req.user;
    const foundTrips = await tripHelpers.findTripByRole(role, id);
    const userData = foundTrips.rows;
    const approvedStats = userData.filter((stats) => stats.status.includes("Approved"));
    const pendingStats = userData.filter((stats) => stats.status.includes("Pending"));
    const rejectedStats = userData.filter((stats) => stats.status.includes("Rejected"));
    const approved = approvedStats.length;
    const pending = pendingStats.length;
    const rejected = rejectedStats.length;
    return res.status(200).send({
      status: 200,
      data: {
        approved,
        pending,
        rejected
      }
    });
  } catch (error) {
    return error;
  }
};

export default tripStats;
