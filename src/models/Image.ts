export interface ImageData {
  original: string | null;
  large: string;
  medium: string;
  small: string;
  xsmall: string;
}

export default class Image {
  original: string | null;
  large: string;
  medium: string;
  small: string;
  xsmall: string;

  /**
   * Initializes a new instance of the Image class.
   *
   * @param {ImageData} data - The data used to initialize the image instance.
   */
  constructor(data: ImageData) {
    this.original = data.original ? "https:" + data.original : null;
    this.large = "https:" + data.large;
    this.medium = "https:" + data.medium;
    this.small = "https:" + data.small;
    this.xsmall = "https:" + data.xsmall;
  }
}
