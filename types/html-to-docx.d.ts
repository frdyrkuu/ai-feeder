declare module "html-to-docx" {
  export default function htmlToDocx(
    html: string,
    options?: {
      orientation?: "portrait" | "landscape";
      margins?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
      };
      font?: string;
    }
  ): Promise<Blob>;
}
