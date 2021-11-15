import React from 'react';

import dynamic from 'next/dynamic';

// TODO: Add service
import { createContentType } from '@/app/services/request/contentTypeRequest';

import styles from '@/ui/styles/pages/manage/content/new.module.scss';

const types = {
  'Article': 'Article',
  'Project': 'Project'
};

const langs = {
  'English': 'en',
  'Russian': 'ru'
};

type NewContentItemForm = {
  title: string
  description: string
  cover: string
  content: string
  type: string
  lang: string
};

type State = {
  form: NewContentItemForm
};

const Editor = dynamic(import('@/ui/components/editor/Editor'), {
  ssr: false
});

class NewContentItem extends React.Component<null, State> {
  public constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
        description: '',
        cover: '',
        content: '',
        type: Object.values(types)[0],
        lang: Object.values(langs)[0]
      }
    };
  }

  public shouldComponentUpdate(nextProps: Readonly<null>, nextState: Readonly<State>, nextContext: any): boolean {
    return this.state.form.content === nextState.form.content;
  }

  public createNewContentItem = async () => {
    await createContentType(
      'ac199200-4e88-4ace-b450-2f319254fcec',
      this.state.form.title,
      this.state.form.description,
      this.state.form.content,
      this.state.form.type,
      this.state.form.lang,
      this.state.form.cover
    );
  }

  public setField(name: string, value: string): void {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  public render() {
    return (
      <div className={styles.form}>
        <h1 className={styles.title}>Create new {this.state.form.type}</h1>
        <div className={styles.group}>
          <label
            className={styles.label}
            htmlFor="title"
          >Title</label>
          <input
            onChange={(e) => this.setField('title', e.target.value)}
            value={this.state.form.title}
            className={styles.input}
            placeholder="Title"
            type="text"
            id="title"
          />
        </div>

        <div className={styles.group}>
          <label
            className={styles.label}
            htmlFor="cover"
          >Cover link</label>
          <input
            onChange={(e) => this.setField('cover', e.target.value)}
            value={this.state.form.cover}
            className={styles.input}
            placeholder="https://"
            type="text"
            id="cover"
          />
        </div>

        <div className={styles.group}>
          <label
            className={styles.label}
            htmlFor="description"
          >Description</label>
          <textarea
            onChange={(e) => this.setField('description', e.target.value)}
            value={this.state.form.description}
            className={styles.textarea}
            rows={15}
            placeholder="Description"
            id="description"
          />
        </div>

        <div className={styles.group}>
          <label
            className={styles.label}
          >Content</label>
          <div className={styles.rounded}>
            <Editor
              onChange={(value: string) => this.setField('content', value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.group}>
            <label
              className={styles.label}
              htmlFor="type"
            >Type</label>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setField('type', e.target.value)}
              value={this.state.form.type}
              className={styles.select}
              name="type"
              id="type"
            >
              {Object.keys(types).map((type) => <option key={type} value={types[type]}>{type}</option>)}
            </select>
          </div>

          <div className={styles.group}>
            <label
              className={styles.label}
              htmlFor="lang"
            >Language</label>
            <select
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.setField('lang', e.target.value)}
              value={this.state.form.lang}
              className={styles.select}
              name="lang"
              id="lang"
            >
              {Object.keys(langs).map((lang) => <option key={lang} value={langs[lang]}>{lang}</option>)}
            </select>
          </div>
        </div>

        <button
          onClick={this.createNewContentItem}
          className={styles.submit}
        >Create draft</button>
      </div>
    );
  }
}

export default NewContentItem;