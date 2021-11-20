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
        tools={tools}
      />
      <button onClick={this.handleSave} className={styles.button}>Save</button>
    </>;
  }
}

export default Editor;
