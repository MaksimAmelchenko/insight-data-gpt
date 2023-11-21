import { useWindowSize } from './use-window-size';

export const sizes = {
  sm: 375 + 1,
  md: 768 + 1,
  lg: 1280 + 1,
};

export function useDeviceSize(breakpoints = sizes) {
  const { width } = useWindowSize();

  const size = width >= breakpoints.lg ? 'lg' : width >= breakpoints.md ? 'md' : width >= breakpoints.sm ? 'sm' : 'xs';

  return {
    isXSmall: size === 'xs',
    isSmall: size === 'sm' || size === 'xs',
    isMedium: size === 'md',
    isLarge: size === 'lg',
  };
}
