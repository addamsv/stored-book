export interface INavbarItem {
  path: string;

  text: string;

  Icon?: React.VFC<React.SVGProps<SVGSVGElement>>;

  authOnly?: boolean;
}
