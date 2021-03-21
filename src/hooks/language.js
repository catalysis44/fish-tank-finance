
import {useIntl, FormattedDate} from 'umi';

export const useLanguage = () => {
  const {messages} = useIntl();
  const t = (key) => {
    if (messages[key]) {
      return messages[key];
    }
    return key;
  };
  return t;
}

