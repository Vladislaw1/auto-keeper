import {
  PiAcornDuotone,
  PiArrowsInDuotone,
  PiBagSimpleDuotone,
  PiBookBookmarkDuotone,
  PiBookOpenUserDuotone,
} from 'react-icons/pi';
import type { JSX } from 'react';
import { FaCarSide } from 'react-icons/fa6';
import { BiUser } from 'react-icons/bi';

export type NavigationIcons = Record<string, JSX.Element>;

const navigationIcon: NavigationIcons = {
  cars: <FaCarSide />,
  owners: <BiUser />,
  singleMenu: <PiAcornDuotone />,
  collapseMenu: <PiArrowsInDuotone />,
  groupSingleMenu: <PiBookOpenUserDuotone />,
  groupCollapseMenu: <PiBookBookmarkDuotone />,
  groupMenu: <PiBagSimpleDuotone />,
};

export default navigationIcon;
