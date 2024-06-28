import 'styled-components';
import { KubedTheme } from '@kubed/components';

declare module 'styled-components' {
  export interface DefaultTheme extends KubedTheme {}
}
