import classNames from '@/utils/classNames';
import { TbCheck } from 'react-icons/tb';
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setSchema } from '@/store/slices/themeSlice';

const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const schema = useAppSelector((state) => state.theme.themeSchema);
  const mode = useAppSelector((state) => state.theme.mode);

  return (
    <div className="inline-flex items-center gap-2">
      {Object.entries(presetThemeSchemaConfig).map(([key, value]) => (
        <button
          key={key}
          className={classNames(
            'h-8 w-8 rounded-full flex items-center justify-center border-2 border-white',
            schema === key && 'ring-2 ring-primary',
          )}
          style={{
            backgroundColor: value[mode].primary || '',
          }}
          onClick={() => dispatch(setSchema(key))}
        >
          {schema === key ? <TbCheck className="text-neutral text-lg" /> : <></>}
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
