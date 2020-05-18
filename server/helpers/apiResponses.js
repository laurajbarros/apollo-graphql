exports.successResponseWithData= function (success, msg, data) {
	var resData = {
		success: success,
		message: msg,
		users: data
	};
	return resData;
};
exports.successResponseWithoutData= function (success, msg) {
	var resData = {
		success: success,
		message: msg,
	};
	return resData;
};

exports.ErrorResponse = function (success, msg) {
  var resData = {
		success: success,
		message: msg,
	};
	return resData;
};
