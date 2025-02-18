export interface IBookBottomNavbarItem {
  path: string;

  text: string;

  Icon?: React.VFC<React.SVGProps<SVGSVGElement>>;

  authOnly?: boolean;
}
