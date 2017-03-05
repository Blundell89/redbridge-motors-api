declare module 'data-uri-to-buffer' {
  function dataUriToBuffer(uri: string): DataUriBuffer;

  interface DataUriBuffer extends Buffer {
    type: string;
    chartset: string;
  }
}