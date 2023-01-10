import { PathLike, PathOrFileDescriptor, promises as fs } from "fs";
import { readFileSync } from "fs";
export abstract class ConfigRealTime {

    static getEnvs(loadAsync: boolean = false) {
      if (loadAsync) {
        return this.parseEnvFile(".env");
    } else {
        return this.parseEnvFileSync(".env");
    }
    }

    private static async parseEnvFile (file: PathLike | fs.FileHandle, {
        exclude = []
      } = {}) {
        const data: string = await fs.readFile(file, {encoding: 'utf-8'})
        return this.parseEnvString(data, {exclude})
    }

    private static parseEnvFileSync (file: PathOrFileDescriptor, {
        exclude = []
      } = {}) {
        const data: string = readFileSync(file, 'utf-8');
        return this.parseEnvString(data, {exclude})
    }
      
     static parseEnvString(data: string, {
        exclude = []
      } = {}){
        var resultEnvMap = {};
        const EXTRACT_ENV_NAME_AND_VALUE_REGEX = /^([^= ]+)=([^\n]*)/gm;
        var results: string[];
        while ((results = EXTRACT_ENV_NAME_AND_VALUE_REGEX.exec(data)) !== null) {
          let variableName = results[1].trim();
          let variableValue = results[2].trim();
          if (exclude.indexOf(variableName) < 0) { resultEnvMap[variableName] = variableValue; }
        }
      
        return this.recursiveReplace(resultEnvMap);
    }

    private static recursiveReplace (map: { [x: string]: string; }) {
        var stringMap = JSON.stringify(map);
        var allEnvNames = Object.keys(map).map(i => '$' + i + '');
    
        replaceAllValuesInMap();
        while (stillHasEnvNamesToReplace()) {
          replaceAllValuesInMap();
        }
        return JSON.parse(stringMap);
    
        function replaceAllValuesInMap () {
          for (let key in map) {
            stringMap = stringMap.replace('$' + key + '', map[key]);
          }
        }
    
        function stillHasEnvNamesToReplace () {
          var result = false;
          for (let i = 0; i < allEnvNames.length; i++) {
            if (stringMap.indexOf(allEnvNames[i]) >= 0) {
              result = true;
              break;
            }
          }
          return result;
        }
      }
}