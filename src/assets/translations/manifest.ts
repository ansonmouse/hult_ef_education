import common_en from './en/common.json';
import common_hi from './hi/common.json';
import common_ja from './ja/common.json';
import common_ko from './ko/common.json';
import common_th from './th/common.json';
import common_vi from './vi/common.json';
import common_zhhk from './zh-HK/common.json';
import program_en from './en/program.json';
import program_hi from './hi/program.json';
import program_ja from './ja/program.json';
import program_ko from './ko/program.json';
import program_th from './th/program.json';
import program_vi from './vi/program.json';
import program_zhhk from './zh-HK/program.json';

const resources = {
  en: {
    common: common_en,
    program: program_en,
  },
  hi: {
    common: common_hi,
    program: program_hi,
  },
  ja: {
    common: common_ja,
    program: program_ja,
  },
  ko: {
    common: common_ko,
    program: program_ko,
  },
  th: {
    common: common_th,
    program: program_th,
  },
  vi: {
    common: common_vi,
    program: program_vi,
  },
  'zh-HK': {
    common: common_zhhk,
    program: program_zhhk,
  },
};

export const LanguageKeyItems = Object.keys(resources);

export default resources;
