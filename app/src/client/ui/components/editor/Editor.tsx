import React from 'react';

import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor as EditorComponent } from 'react-draft-wysiwyg';

import draftToHtml from 'draftjs-to-html';

import styles from './editor.module.scss';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type Props = {
  onChange: (value: string) => void
  initialValue?: string
};

type State = {
  editorState: EditorState
  compiledState: string
};

class Editor extends React.Component<Props, State> {
  public constructor(props) {
    super(props);

    let editorState;

    if (this.props.initialValue) {
      const blocksFromHTML = convertFromHTML(this.props.initialValue);
      editorState = EditorState.createWithContent(ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      ));
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = {
      editorState,
      compiledState: ''
    };
  }

  public componentDidMount() {
    this.handleSave();
  }

  public handleChange = (state: EditorState) => {
    this.setState({
      editorState: state,
    });
  }

  public handleSave = () => {
    const compiled = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));
    this.setState({
      compiledState: compiled
    });
    this.props.onChange(compiled);
  }

  public render() {
    return (
      <div>
        <div className={styles.editor}>
          <EditorComponent
            editorState={this.state.editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={this.handleChange}
          />
        </div>
        <textarea
          className={styles.preview}
          value={this.state.compiledState}
          disabled
        />
        <button onClick={this.handleSave} className={styles.button}>Save</button>
      </div>
    );
  }
}

export default Editor;
