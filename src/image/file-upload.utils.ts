import { uuid } from 'uuidv4';

export const editFileName = (req, file, callback) => {
  const typeFile = file.originalname.match(/\.[0-9a-z]+$/i)[0];

  // const randomName = Array(10)
  //   .fill(null)
  //   .map(() => Math.round(Math.random() * 16).toString(16))
  //   .join('');
  const name = uuid();
  
  callback(null, `${name}${'thien'}${typeFile}`);
};
export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const getFileUrl = (fileName: string) => {
  return (
    'https://' + 'mobile-app-123.herokuapp.com' + '/image/download/' + fileName
  );
};
