import dotenv from 'dotenv';
import searchHelpers from '../helpers/searchHelper';

import Auth from "../helpers/TokenHelper";


dotenv.config();
const searchData = async (req, res) => {
  try {
    const { token } = req.headers;
    const decoded = await Auth.decodedToken(token, process.env.SECRET_KEY);
    req.userData = decoded;
    const request = req.body.search;
    const myId = req.user.id;
    let data;
    if (req.userData.role === 'MANAGER') {
      if (typeof request === 'string') {
        data = await searchHelpers.managerStringSearch(request);
        if (!data.length) {
          data = await searchHelpers.managerDateSearch(request);

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
      return;
    }

    if (typeof request === 'string') {
      data = await searchHelpers.searchByString({ request, myId });
      if (!data.length) {
        data = await searchHelpers.requesterDateSearch({ request, myId });

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
export default searchData;
