import { Button, Tooltip, Spin, Card, Input } from "antd";
import logo from "/logo.png";
import "./App.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ArticleModal from "./components/ArticleModal";
import "@ant-design/v5-patch-for-react-19";
import { deleteArticle, getArticles } from "./fire";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleArticleSubmit = (article) => {
    console.log("Article ajouté :", article);
    setIsModalOpen(false);
    setLoading(true);
    getArticles((posts) => {
      setArticles(posts);
      setLoading(false);
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedArticle(null)
  };

  useEffect(() => {
    getArticles((posts) => {
      setArticles(posts);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div>
        <a
          href="https://www.mercedes-benz.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logo} className="logo" alt="logo" />
        </a>

        <video className="video" autoPlay loop muted playsInline>
          <source src="/Pub_Mercedes.mp4" type="video/mp4" />
        </video>

        <div>
          <h1 className="texte">Mercedes-Benz</h1>
          <Input
        placeholder="Search articles..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: 300, marginBottom: '20px' }}
      />
      <br />
          <Tooltip title="Donnez nous votre avis sur le nouveau GLE 🤔">
            <Button
              className="Bouton"
              type="primary"
              icon={<EditOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Donnez votre avis !
            </Button>
          </Tooltip>
        </div>

        <div className="articles-container">
          {loading ? (
            <Spin />
          ) : (
            articles
            .filter(article =>
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              article.content.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((article) => (
              <Card
                key={article.id}
                title={article.title}
                variant={false}
                style={{ width: 300, margin: "16px auto" }}
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      setSelectedArticle(article);
                      setIsModalOpen(true);
                    }}
                  />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => deleteArticle(article)}
                  />,
                ]}
              >
                <p>{article.content}</p>
              </Card>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <ArticleModal
          visible={isModalOpen}
          handleClose={handleModalClose}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedArticle(null)
          }}
          onSubmit={handleArticleSubmit}
          selectedArticle={selectedArticle}
        />
      )}
    </>
  );
}

export default App;
