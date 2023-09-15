import * as pdfjs from 'pdfjs-dist/legacy/build/pdf';
import PDFViewer from '../src/pdf/PDFViewer';
// import { pdfjs, PDFViewer } from '../src';
// import { PDFViewer } from '@recogito/recogito-react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = 'pdf.worker.js';

export {
  pdfjs, PDFViewer
}
