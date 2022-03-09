import React from 'react';

import { GetServerSideProps } from 'next';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import { editContentItem } from '@/app/services/request/contentItem';

import { ContentItem as ContentItemInterface, Language, Type } from '@/domain/content/contentItem';

import getOneContentItemHandler from '@/api/useCases/contentItem/getOne/handler';
import getOneContentItemCommand from '@/api/useCases/contentItem/getOne/command';

import ContentMoreButton from '@/ui/components/content-list/more-button/ContentMoreButton.component';

import AdminLayout from '@/ui/layouts/admin/AdminLayout';

import styles from '@/ui/styles/pages/manage/content/new.module.scss';

type EditContentItemForm = {
  title: string
  description: string
  cover: string
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
    this.state = {
      form: {
        ...this.props.contentItem as EditContentItemForm,
        rawContent: this.props.contentItem.rawContent
      }
    };
  }

  public shouldComponentUpdate(nextProps: Readonly<null>, nextState: Readonly<State>, nextContext: any): boolean {
    return this.state.form.rawContent === nextState.form.rawContent;
  }

  public createNewContentItem = async () => {
    await editContentItem(
      this.props.contentItem.id,
      this.state.form.title,
      this.state.form.description,
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
        rawContent: JSON.stringify(value)
      }
    }));
  }

  public render() {
    return (
      <AdminLayout>
        <div className={styles.form}>
          <h1 className={styles.title}>Edit {this.state.form.type}</h1>

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
                initialValue={JSON.parse(this.state.form.rawContent)}
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
                {Object.keys(Type).map((type) => <option key={type} value={Type[type]}>{type}</option>)}
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
                {Object.keys(Language).map((lang) => <option key={lang} value={Language[lang]}>{lang}</option>)}
              </select>
            </div>
          </div>

          <div className={styles.align}>
            <ContentMoreButton onClick={this.createNewContentItem} text="Edit and make draft" />
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default EditContentItem;