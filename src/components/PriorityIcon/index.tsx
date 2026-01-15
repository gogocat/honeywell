import React from 'react';
import alarmHigh from '../../assets/img/alarm-high.svg';
import alarmMedium from '../../assets/img/alarm-medium.svg';
import alarmLow from '../../assets/img/alarm-low.svg';

interface PriorityIconProps {
  priority: number;
}

const PriorityIcon: React.FC<PriorityIconProps> = ({ priority }) => {
  let src;
  let label;

  switch (priority) {
    case 1:
      src = alarmHigh;
      label = 'High Priority Alarm';
      break;
    case 2:
      src = alarmMedium;
      label = 'Medium Priority Alarm';
      break;
    default:
      src = alarmLow;
      label = 'Low Priority Alarm';
      break;
  }

  return (
    <img 
      src={src} 
      alt={label} 
      title={label}
      style={{ width: '24px', height: '24px' }} 
      role="img"
    />
  );
};

export default PriorityIcon;
