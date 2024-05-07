import Images from '../assets/images';
import moment from 'moment';

const infoData = [
  {
    image: Images.calendar,
    title: moment().format('DD MMM'),
    description: 'Start Date',
  },
  {
    image: Images.clock,
    title: moment().format('hh:mm'),
    description: 'Start Time',
  },
  {
    image: Images.priorityIcon,
    title: moment().format('DD MMM'),
    description: 'Priority',
  },
  {
    image: Images.durationIcon,
    title: '1.0 Hr',
    description: 'Duration',
  },
];
const safetyAlertData = [
  {
    id: 1,
    image: Images.battery,
    title: 'Battery',
    description: 'Good',
  },
  {
    id: 2,
    image: Images.files,
    title: 'Data',
    description: 'Poor',
  },
  {
    id: 3,
    image: Images.location,
    title: 'Location',
    description: 'Poor',
  },
];
export default {
  infoData,
  safetyAlertData,
};
