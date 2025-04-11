/*
 * Please refer to the LICENSE file in the root directory of the project.
 * https://github.com/kubesphere/console/blob/master/LICENSE
 */

type ResolvableBoolean = boolean | undefined | (() => boolean | undefined);

function resolveBoolean(value: ResolvableBoolean) {
  if (typeof value === 'function') {
    return Boolean(value());
  }

  return Boolean(value);
}

interface UIState {
  isVisible?: ResolvableBoolean;
  isShown?: ResolvableBoolean;
  isHidden?: ResolvableBoolean;
  isEnabled?: ResolvableBoolean;
  isDisabled?: ResolvableBoolean;
  isReadOnly?: ResolvableBoolean;
  isLoading?: ResolvableBoolean;

  [key: string]: unknown;
}

function resolveVisibilityState(state: UIState) {
  const isVisible = resolveBoolean(state.isVisible) || resolveBoolean(state.isShown);
  const isHidden = resolveBoolean(state.isHidden);
  const isFinalVisible = isVisible && !isHidden;
  const isFinalHidden = !isFinalVisible;

  return { isVisible: isFinalVisible, isHidden: isFinalHidden };
}

function resolveEnabledState(state: UIState) {
  const isEnabled = resolveBoolean(state.isEnabled);
  const isDisabled = resolveBoolean(state.isDisabled);
  const isReadOnly = resolveBoolean(state.isReadOnly);
  const isLoading = resolveBoolean(state.isLoading);

  const isCalculatedDisabled = isDisabled || isReadOnly || isLoading;

  const isFinalEnabled = isEnabled && !isCalculatedDisabled;
  const isFinalDisabled = !isFinalEnabled;

  return { isEnabled: isFinalEnabled, isDisabled: isFinalDisabled };
}

export { resolveVisibilityState, resolveEnabledState };
