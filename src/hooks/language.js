
import {useIntl, FormattedDate} from 'umi';


export const useLanguage = () => {
  const {messages} = useIntl();
  const t = (key, replacement=[]) => {
    if (messages[key] && replacement.length > 0)
    {
      let result = messages[key];
      for(let i=0;i<replacement.length;i++)
      {
        result = result.replace("{"+i+"}",replacement[i]);
      }
      return result;
    }

    // Suppoted Empty string //
    if (typeof messages[key] != "undefined") {
      return messages[key];
    }

    // For no key case //
    if (replacement.length > 0)
    {
      let result = key;
      for(let i=0;i<replacement.length;i++)
      {
        result = result.replace("{"+i+"}",replacement[i]);
      }
      return result;
    }
    return key;
  };
  return t;
}

