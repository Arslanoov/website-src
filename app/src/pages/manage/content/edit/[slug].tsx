import React from 'react';

import { GetServerSideProps } from 'next';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { editContentItem } from '@/app/services/request/contentItem';

import { jsonToHtml } from '@/app/utils/json-to-html/jsonToHtml';

import { ContentItem as ContentItemInterface } from '@/domain/content/contentItem';

import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';
import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';

import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import styles from '@/ui/styles/pages/manage/content/new.module.scss';

const types = {
  'Article': 'Article',
  'Project': 'Project'
};

const langs = {
  'English': 'en',
  'Russian': 'ru'
};

type EditContentItemForm = {
  title: string
  description: string
  cover: string
  content: string
  rawContent: string
  type: string
  lang: string
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const contentItem = await getOneContentItemHandler(
    new getOneContentItemCommand(
      (req.query.slug ?? '') as string,
      true
    )
  );

  return {
    props: {
      contentItem
    }
  };
};

type Props = {
  contentItem: ContentItemInterface
};

type State = {
  form: EditContentItemForm
};

const Editor = dynamic(import('@/ui/components/editor/Editor'), {
  ssr: false
});

class EditContentItem extends React.Component<Props, State> {
  public constructor(props) {
    super(props);
    console.log(this.props.contentItem.rawContent);
    this.state = {
      form: {
        ...this.props.contentItem as EditContentItemForm,
        rawContent: JSON.parse(this.props.contentItem.rawContent)
      }
    };
  }

  public shouldComponentUpdate(nextProps: Readonly<null>, nextState: Readonly<State>, nextContext: any): boolean {
    return this.state.form.content === nextState.form.content;
  }

  public createNewContentItem = async () => {
    await editContentItem(
      this.props.contentItem.id,
      this.state.form.title,
      this.state.form.description,
      this.state.form.content,
      this.state.form.rawContent,
      this.state.form.type,
      this.state.form.lang,
      this.state.form.cover
    );

    Router.push('/manage/content/list');
  }

  public setField(name: string, value: string): void {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  }

  public setContent(value: string): void {
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        content: jsonToHtml(value),
        rawContent: JSON.stringify(value)
      }
    }));
  }

  public render() {
    return (
      <div className={styles.form}>
        <h1 className={styles.title}>Create new {this.state.form.type}</h1>

        <div className={styles.align}>
          <ContentMoreButton link="/manage/content/list" text="Back to list" />
        </div>

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
              onChange={(value: string) => this.setContent(value)}
              initialValue={this.state.form.rawContent}
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

        <div className={styles.align}>
          <ContentMoreButton onClick={this.createNewContentItem} text="Edit and make draft" />
        </div>
      </div>
    );
  }
}

export default EditContentItem;