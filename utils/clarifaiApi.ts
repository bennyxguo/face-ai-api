const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');

export default function faceRecognition(imageUrl, successCallback, errCallback) {
  const stub = ClarifaiStub.grpc();
  const metadata = new grpc.Metadata();
  metadata.set('authorization', `Key ${process.env.CLARIFAI_KEY}`);

  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available Face model.
      model_id: 'f76196b43bbd45c99b4f3cd8e8b40a8a',
      inputs: [{ data: { image: { url: imageUrl } } }]
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log('Error: ' + err);
        errCallback(err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          'Received failed status: ' + response.status.description + '\n' + response.status.details
        );
        errCallback(
          'Received failed status: ' + response.status.description + '\n' + response.status.details
        );
        return;
      }

      successCallback(response);
    }
  );
}
