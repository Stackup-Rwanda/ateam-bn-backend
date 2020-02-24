/**
 * This class contains all methods
 * required to handle
 * paginations.
 */
class PaginateData {
  /**
     * This method handle the pagination of retrieved data.
     * @param {object} req The user request.
     * @param {object} res The response.
     * @returns {object} The paginated data.
     */
  static paginatedRetrievedData(req, res) {
    const limit = 5;
    const page = parseInt(req.params.page, 10);
    const start = (page - 1) * limit;
    const end = page * limit;
    let messagePrevious = {};
    let messageNext = {};
    const paginate = {};
    messagePrevious = { message: `No data found on this page ${page}` };
    messageNext = { message: `No data found on this ${page}` };
    paginate.paginate = req.data.slice(start, end);
    messagePrevious.Previous = {
      page: page - 1,
      limit
    };
    messageNext.Next = {
      page: 1,
      limit
    };
    if (!page) {
      return res.status(404).json({
        status: 404,
        message: 'No page found'
      });
    }
    if (start < 0) {
      return res.status(404).json({
        status: 404,
        message: messageNext
      });
    }
    if (paginate.paginate.length <= 0) {
      return res.status(404).json({
        status: 404,
        message: messagePrevious
      });
    }
    if (start > 0) {
      paginate.previous = {
        test: `nmdfndffjksfnmsdjklf;gnklgd;kfg`,
        page: page - 1,
        limit
      };
    }
    if (end < req.data.length) {
      paginate.next = {
        page: page + 1,
        limit
      };
    }
    return res.status(200).json({
      status: 200,
      message: `${req.user.username} Those are data from this page ${page}`,
      data: paginate
    });
  }
}
export default PaginateData;
