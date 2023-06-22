import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

const ENV = process.env.NODE_ENV ?? 'local';
const YAML_APPLICATION_FILENAME = '../env/application.yaml';
const YAML_ENV_APPLICATION_FILENAME = `../env/application.${ENV}.yaml`;

export default () => {
  let commonConfig = yaml.load(
    readFileSync(join(__dirname, YAML_APPLICATION_FILENAME), 'utf-8'),
  ) as Record<string, any>;
  let envConfig = yaml.load(
    readFileSync(join(__dirname, YAML_ENV_APPLICATION_FILENAME), 'utf-8'),
  );

  let combile = Object.assign({}, commonConfig, envConfig);
  // console.log(combile);

  return combile;
};
