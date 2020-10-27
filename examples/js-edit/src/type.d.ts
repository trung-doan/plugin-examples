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