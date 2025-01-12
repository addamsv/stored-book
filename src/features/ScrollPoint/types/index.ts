/** Record<string, number>
 * key - адрес страницы
 * val - позиция
 */
export type IScroll = Record<string, number>;

export interface IScrollPointStateSchema {
  scroll: IScroll;
}
