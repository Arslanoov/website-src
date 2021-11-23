import React, { createRef } from 'react';
import { createReactEditorJS } from 'react-editor-js';

import tools from '@/app/config/editor/tools';

import styles from './editor.module.scss';

const EditorJs = createReactEditorJS();

type Props = {
  onChange: (value: string) => void
  initialValue?: string
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
    this.props.onChange(await this.editorJS.current.save());
  }

  public render() {
    return <>
      <EditorJs
        onInitialize={this.handleInitialize}
        defaultValue={this.props.initialValue ?? ''}
        tools={tools}
      />
      <button onClick={this.handleSave} className={styles.button}>Save</button>
    </>;
  }
}

export default Editor;
