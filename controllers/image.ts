import { Request, Response } from 'express';
import UserModel from '../models/user';
import Clarifai from 'clarifai';

const updateEntry = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) return res.status(400).json('Incorrect credentials.');

  let user = await UserModel.findByPk(id);
  if (!user) return res.status(400).json('User not found.');
  user.entries = user.entries + 1;
  try {
    await user.save();
    return res.json(user.entries);
  } catch (error) {
    return res.status(400).json('Entry update failed.');
  }
};

const faceRecognition = async (req: Request, res: Response) => {
  const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_KEY
  });

  try {
    const data = await app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input);
    // const data = JSON.parse(
    //   '{"status":{"code":10000,"description":"Ok","req_id":"905abff762084a7f9e6a18e1e267515a"},"outputs":[{"id":"7cc10c64c94742b8ae99fb589c973c57","status":{"code":10000,"description":"Ok"},"created_at":"2021-07-27T18:35:24.986245793Z","model":{"id":"a403429f2ddf4b49b307e318f00e528b","name":"face","created_at":"2016-10-25T19:30:38.541073Z","app_id":"main","output_info":{"output_config":{"concepts_mutually_exclusive":false,"closed_environment":false,"max_concepts":0,"min_value":0},"message":"Show output_info with: GET /models/{model_id}/output_info","type":"detect-concept","type_ext":"detect-concept"},"model_version":{"id":"34ce21a40cc24b6b96ffee54aabff139","created_at":"2019-01-17T19:45:49.087547Z","status":{"code":21100,"description":"Model is trained and ready"},"visibility":{"gettable":10},"app_id":"main","user_id":"clarifai","metadata":{}},"display_name":"Face Detection","user_id":"clarifai","input_info":{},"train_info":{},"model_type_id":"visual-detector","visibility":{"gettable":10},"metadata":{}},"input":{"id":"350f89d8bd9a43daafd55f65ad87b15a","data":{"image":{"url":"https://images.unsplash.com/photo-1627400101630-e9b06362da4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"}}},"data":{"regions":[{"id":"3ef44fbd2b4dd3df57da3ff6f2b5aad7","region_info":{"bounding_box":{"top_row":0.29687735,"left_col":0.28536698,"bottom_row":0.59247524,"right_col":0.6672687}},"data":{"concepts":[{"id":"ai_8jtPl3Xj","name":"face","value":0.9996896,"app_id":"main"}]},"value":0.9996896}]}}],"rawData":{"status":{"code":10000,"description":"Ok","req_id":"905abff762084a7f9e6a18e1e267515a"},"outputs":[{"id":"7cc10c64c94742b8ae99fb589c973c57","status":{"code":10000,"description":"Ok"},"created_at":"2021-07-27T18:35:24.986245793Z","model":{"id":"a403429f2ddf4b49b307e318f00e528b","name":"face","created_at":"2016-10-25T19:30:38.541073Z","app_id":"main","output_info":{"output_config":{"concepts_mutually_exclusive":false,"closed_environment":false,"max_concepts":0,"min_value":0},"message":"Show output_info with: GET /models/{model_id}/output_info","type":"detect-concept","type_ext":"detect-concept"},"model_version":{"id":"34ce21a40cc24b6b96ffee54aabff139","created_at":"2019-01-17T19:45:49.087547Z","status":{"code":21100,"description":"Model is trained and ready"},"visibility":{"gettable":10},"app_id":"main","user_id":"clarifai","metadata":{}},"display_name":"Face Detection","user_id":"clarifai","input_info":{},"train_info":{},"model_type_id":"visual-detector","visibility":{"gettable":10},"metadata":{}},"input":{"id":"350f89d8bd9a43daafd55f65ad87b15a","data":{"image":{"url":"https://images.unsplash.com/photo-1627400101630-e9b06362da4d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"}}},"data":{"regions":[{"id":"3ef44fbd2b4dd3df57da3ff6f2b5aad7","region_info":{"bounding_box":{"top_row":0.29687735,"left_col":0.28536698,"bottom_row":0.59247524,"right_col":0.6672687}},"data":{"concepts":[{"id":"ai_8jtPl3Xj","name":"face","value":0.9996896,"app_id":"main"}]},"value":0.9996896}]}}]}}'
    // );
    return res.json(data);
  } catch (error) {
    return res.status(400).json('Unable to work with API');
  }
};

export default {
  updateEntry,
  faceRecognition
};
