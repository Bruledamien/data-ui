import React from 'react';
import PropTypes from 'prop-types';
import { AxisLeft, AxisRight } from '@vx/axis';

import { axisStylesShape, tickStylesShape } from '../utils/propShapes';

const propTypes = {
  axisStyles: axisStylesShape,
  label: PropTypes.string,
  labelProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  numTicks: PropTypes.number,
  orientation: PropTypes.oneOf(['left', 'right']),
  tickStyles: tickStylesShape,
  tickLabelProps: PropTypes.func,
  tickFormat: PropTypes.func,
  tickValues: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),

  // probably injected by parent
  top: PropTypes.number,
  left: PropTypes.number,
  scale: PropTypes.func,
};

const defaultProps = {
  axisStyles: {},
  label: null,
  labelProps: null,
  left: 0,
  numTicks: 5,
  orientation: 'left',
  scale: null,
  tickFormat: null,
  tickLabelProps: undefined,
  tickStyles: {},
  tickValues: undefined,
  top: 0,
};

export default function YAxis({
  axisStyles,
  label,
  labelProps,
  top,
  left,
  numTicks,
  orientation,
  scale,
  tickFormat,
  tickLabelProps: passedTickLabelProps,
  tickStyles,
  tickValues,
}) {
  if (!scale) return null;
  const Axis = orientation === 'left' ? AxisLeft : AxisRight;

  let tickLabelProps = passedTickLabelProps;

  if (!tickLabelProps) {
    tickLabelProps =
      tickStyles.label && tickStyles.label[orientation]
        ? () => tickStyles.label[orientation]
        : undefined;
  }

  return (
    <Axis
      top={top}
      left={left}
      hideTicks={false}
      hideZero={false}
      label={label}
      labelProps={labelProps || (axisStyles.label || {})[orientation]}
      numTicks={numTicks}
      scale={scale}
      stroke={axisStyles.stroke}
      strokeWidth={axisStyles.strokeWidth}
      tickFormat={tickFormat}
      tickLabelProps={tickLabelProps}
      tickLength={tickStyles.tickLength}
      tickStroke={tickStyles.stroke}
      tickValues={tickValues}
    />
  );
}

YAxis.propTypes = propTypes;
YAxis.defaultProps = defaultProps;
YAxis.displayName = 'YAxis';
