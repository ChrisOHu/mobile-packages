MeteorCamera.getPicture = function (options, callback) {
  // if options are not passed
  if (! callback) {
    callback = options;
    options = {};
  }

  var success = function (data) {
    if (options && options.destinationType === Camera.DestinationType.FILE_URI) {
      callback(null, data);
    } else {
      callback(null, "data:image/jpeg;base64," + data);
    }
  };

  var failure = function (error) {
    callback(new Meteor.Error("cordovaError", error));
  };

  navigator.camera.getPicture(success, failure, 
    _.extend(options, {
      quality: options.quality || 49,
      targetWidth: options.width || 640,
      targetHeight: options.height || 480,
      destinationType: options.destinationType || Camera.DestinationType.DATA_URL
    })
  );
};
