import React, { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { addArticle, updateArticle } from "../fire"; // adapte le chemin selon ton projet

const ArticleModal = ({ visible, handleClose, selectedArticle }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedArticle) {
      form.setFieldsValue({
        title: selectedArticle.title,
        content: selectedArticle.content,
      });
    } else {
      form.resetFields();
    }
  }, [selectedArticle, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      let article = {
        ...values,
        createdAt: new Date(),
        comments: selectedArticle?.comments || [],
      };

      if (selectedArticle) {
        article.id = selectedArticle.id;
        updateArticle(article);
      } else {
        addArticle(article);
      }

      handleClose(); // ferme la modale
      form.resetFields(); // nettoie le formulaire
    });
  };

  return (
    <Modal
      title={selectedArticle ? "Modifier l'article" : "Créer un nouvel avis"}
      open={visible}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="title"
          label="Objet"
          rules={[{ required: true, message: "Veuillez entrer un objet" }]}
        >
          <Input placeholder="Objet de l'avis..." />
        </Form.Item>

        <Form.Item
          name="content"
          label="Votre avis"
          rules={[{ required: true, message: "Dites-nous votre avis ! 😁" }]}
        >
          <Input.TextArea rows={4} placeholder="Qu'en pensez-vous ? 🤔" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            {selectedArticle ? "Modifier" : "Publier l'avis"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleModal;
