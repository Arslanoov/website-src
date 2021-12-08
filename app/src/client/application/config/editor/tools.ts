import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Raw from '@editorjs/raw';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import SimpleImage from '@editorjs/simple-image';
import InlineCode from '@editorjs/inline-code';

export default {
  header: {
    class: Header,
    config: {
      placeholder: 'Header',
      levels: [2, 3, 4],
      defaultLevel: 2
    },
    inlineToolbar: true
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true
  },
  list: {
    class: List,
    inlineToolbar: true
  },
  embed: Embed,
  table: Table,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  simpleImage: SimpleImage,
  inlineCode: InlineCode,
  raw: Raw,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter
};