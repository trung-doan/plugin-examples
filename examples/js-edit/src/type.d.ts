declare const ace: any;
declare let kintone: any;
declare let kintoneUIComponent: any;

type Locales = {
  en: any;
  jp: any;
}

type ItemUserGuide = {
  url: string,
  label: string
}

type UserGuideProps = {
  links: ItemUserGuide[];
};

declare type CustomizationType = 'js_pc' | 'js_mb' | 'css_pc'| 'css_mb' | '';
