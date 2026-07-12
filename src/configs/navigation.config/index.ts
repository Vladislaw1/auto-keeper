import { NAV_ITEM_TYPE_ITEM } from '@/constants/navigation.constant';

import type { NavigationTree } from '@/@types/navigation';

const navigationConfig: NavigationTree[] = [
  {
    key: 'cars',
    path: '/cars',
    title: 'Автомобілі',
    translateKey: 'nav.cars',
    icon: 'cars',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
  {
    key: 'owners',
    path: '/owners',
    title: 'Власники',
    translateKey: 'nav.owners',
    icon: 'owners',
    type: NAV_ITEM_TYPE_ITEM,
    authority: [],
    subMenu: [],
  },
];

export default navigationConfig;
