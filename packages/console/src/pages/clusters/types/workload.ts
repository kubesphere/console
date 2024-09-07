/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

interface EditYamlConfig<T> {
  editResource: T | null;
  visible: boolean;
  yaml: string;
  readOnly: boolean;
}
interface ModalBaseConfig<T> {
  source: T | null;
  visible: boolean;
}
interface BatchOptConfig<T> {
  source: T[] | null;
  visible: boolean;
}

export { EditYamlConfig, ModalBaseConfig, BatchOptConfig };
