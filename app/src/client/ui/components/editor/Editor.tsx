import React, { createRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import tools from '@/app/config/editor/tools';
import { jsonToHtml } from '@/app/utils/json-to-html/jsonToHtml';

import styles from './editor.module.scss';

const EditorJs = createReactEditorJS();

type Props = {
  onChange: (value: string) => void
};

class Editor extends React.Component<Props> {
  private editorJS

  public constructor(props) {
    super(props);
    this.editorJS = createRef();
  }

  public shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
    return false;
  }

  public handleInitialize = instance => {
    this.editorJS.current = instance;
  }

  public handleSave = async () => {
    this.props.onChange(jsonToHtml(await this.editorJS.current.save()));
  }

  public render() {
    return <>
      <EditorJs
        onInitialize={this.handleInitialize}
        defaultValue={{
          time: 1556098174501,
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Заголовок',
                level: 2
              }
            },
            {
              type: 'paragraph',
              data: {
                text:
                  'Очень интересный текст статьи....'
              }
            },
            {
              type: 'header',
              data: {
                text: 'Заголовок списка',
                level: 3
              }
            },
            {
              type: 'list',
              data: {
                style: 'unordered',
                items: [
                  'Первое',
                  'Второе',
                  'И главное, <code class="inline-code">третье</code>'
                ]
              }
            },
          ],
          version: '2.16.1'
        }}
        tools={tools}
      />
      <button onClick={this.handleSave} className={styles.button}>Save</button>
    </>;
  }
}

export default Editor;
