import { compareVersion } from 'utils'
import StepsEditorOld from '../StepsEditorOld'
import StepsEditor from './StepsEditor'

export const getStepsEditor = version => {
  return [
    [
      v => {
        return compareVersion(v, '3.4.0') < 0
      },
      StepsEditorOld,
    ],
    [() => true, StepsEditor],
  ].find(([condition]) => condition(version))[1]
}

export default StepsEditor
