import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';

const ENV = process.env.NODE_ENV ?? 'local';
const YAML_APPLICATION_FILENAME = '../env/application.yaml';
const YAML_ENV_APPLICATION_FILENAME = `../env/application.${ENV}.yaml`;
const YAML_AMZ_APPLICATION_FILENAME = `../env/application.a3s.setting.yaml`;

export default () => {
  let commonConfig = yaml.load(
    readFileSync(join(__dirname, YAML_APPLICATION_FILENAME), 'utf-8'),
  ) as Record<string, any>;
  let amzConfig = yaml.load(readFileSync(join(__dirname, YAML_AMZ_APPLICATION_FILENAME), 'utf-8'),) as Record<string, any>;
  let envConfig = yaml.load(
    readFileSync(join(__dirname, YAML_ENV_APPLICATION_FILENAME), 'utf-8'),
  );

  let combile = Object.assign({}, commonConfig, envConfig, amzConfig);
  // console.log(combile);

  return combile;
};
