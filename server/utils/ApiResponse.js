// server/utils/ApiResponse.js

/**
 * CONCEPT: Standardized API Response
 * 
 * Every successful API response will have the same shape:
 * {
 *   statusCode : 200,
 *   data       : { ...actual data here... },
 *   message    : "Contests fetched successfully",
 *   success    : true
 * }
 * 
 * This makes frontend Axios handling very predictable.
 * response.data.data always has what you need.
 */

class ApiResponse {
  constructor(
    statusCode,                      // HTTP status 200, 201, etc.
    data,                            // the actual payload
    message = "Success"              // human readable message
  ) {
    this.statusCode = statusCode;
    this.data       = data;
    this.message    = message;

    // statusCode < 400 means success (200, 201, 204 etc.)
    this.success    = statusCode < 400;
  }
}

module.exports = ApiResponse;


/* HOW TO USE 
 *
 * const ApiResponse = require("../utils/ApiResponse");
 *
 * // In a controller:
 * return res
 *   .status(200)
 *   .json(new ApiResponse(200, contests, "Contests fetched successfully"));
 *
 * // Frontend receives:
 * // {
 * //   statusCode : 200,
 * //   data       : [ ...contests ],
 * //   message    : "Contests fetched successfully",
 * //   success    : true
 * // }
 *
 * */