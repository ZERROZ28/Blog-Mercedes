import React from "react";
import { Input, Button } from "antd";
const { TextArea } = Input;

export default function ArticleForm({
  title,
  content,
  handleChange,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="title">Objet</label>
      <Input
        name="title"
        value={title}
        onChange={handleChange}
        placeholder="Entrez l'objet de l'avis"
      />

      <label htmlFor="content">Contenu</label>
      <TextArea
        name="content"
        value={content}
        onChange={handleChange}
        rows={4}
        placeholder="Dites-nous ce que vous pensez du nouveau GLE 🤔"
      />

      <Button type="primary" htmlType="submit">
        Publier l'avis
      </Button>
    </form>
  );
}
