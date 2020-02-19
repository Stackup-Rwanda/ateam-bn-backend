import searchHelpers from '../helpers/searchHelper';

const searchData = async (req, res) => {
  try {
    const request = req.body.search;
    const myId = req.user.id;
    let data;
    if (typeof request === 'string') {
      data = await searchHelpers.searchByString({ request, myId });
      if (!data.length) {
        res.status(404).send({
          status: 404,
          error: "request with given input was not found"
        });
      }
      res.status(200).send({
        status: 200,
        data
      });
    }

    data = await searchHelpers.searchByInteger({ request, myId });
    if (!data.length) {
      res.status(404).send({
        status: 404,
        error: "request with given input was not found"
      });
    }
    res.status(200).send({
      status: 200,
      data
    });
  } catch (error) {
    res.status(404).send({
      status: 404,
      error: "request with given input was not found"
    });
  }
};
const managerSearch = async (req, res) => {
  const request = req.body.search;
  let data;
  if (typeof request === 'string') {
    data = await searchHelpers.managerStringSearch(request);
    if (!data.length) {
      res.status(404).send({
        status: 404,
        error: "request with given input was not found"
      });
    }
    res.status(200).send({
      status: 200,
      data
    });
  }
  data = await searchHelpers.managerIntegerSearch(request);
  if (!data.length) {
    res.status(404).send({
      status: 404,
      error: "request with given input was not found"
    });
  }
  res.status(200).send({
    status: 200,
    data
  });
};


export
{
  searchData,
  managerSearch
};
