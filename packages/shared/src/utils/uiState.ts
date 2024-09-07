/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

type Value = boolean | undefined | (() => boolean | undefined);

function resolveValue(value: Value) {
  if (typeof value === 'function') {
    return Boolean(value());
  }

  return Boolean(value);
}

interface UIState {
  isShown?: Value;
  isHidden?: Value;
  isEnabled?: Value;
  isDisabled?: Value;
  isReadOnly?: Value;
  isLoading?: Value;

  [key: string]: any;
}

function shouldDisplay(state: UIState) {
  const isShown = resolveValue(state.isShown);
  const isHidden = resolveValue(state.isHidden);

  return isShown && !isHidden;
}

function getDisabledState(state: UIState) {
  const isEnabled = resolveValue(state.isEnabled);
  const isDisabled = resolveValue(state.isDisabled);
  const isReadOnly = resolveValue(state.isReadOnly);
  const isLoading = resolveValue(state.isLoading);

  if (isDisabled) {
    return { isEnabled: false, isDisabled: true };
  }

  if (isReadOnly) {
    return { isEnabled: false, isDisabled: true };
  }

  if (isLoading) {
    return { isEnabled: false, isDisabled: true };
  }

  return { isEnabled, isDisabled: !isEnabled };
}

export { shouldDisplay, getDisabledState };
