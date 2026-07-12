import HorizontalMenuContent from './HorizontalMenuContent';
import { useAppSelector } from '@/store/hooks';
import appConfig from '@/configs/app.config';
import navigationConfig from '@/configs/navigation.config';

const HorizontalNav = ({
  translationSetup = appConfig.activeNavTranslation,
}: {
  translationSetup?: boolean;
}) => {
  const currentRouteKey = useAppSelector((state) => state.routeKey.currentRouteKey);
  const userAuthority = useAppSelector((state) => state.auth.user.authority);

  return (
    <HorizontalMenuContent
      navigationTree={navigationConfig}
      routeKey={currentRouteKey}
      userAuthority={userAuthority || []}
      translationSetup={translationSetup}
    />
  );
};

export default HorizontalNav;
