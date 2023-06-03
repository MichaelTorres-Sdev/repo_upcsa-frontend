/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import {
  listRepoByRate,
  listRepoByName,
  listRepoByDate,
  listAllRepoByDate,
  listAllRepoByName,
  listAllRepoByRate,
  searchRepositories,
} from "../../../helpers/Http";
import { AuthContext } from "../../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import "./Repositories.css";
import robot from "../../../assets/avatars/rounded-head.svg";

function Repositories() {
  const params = useParams();
  //params.sort para obtener el parametro
  //params.page para obtener la pagina

  const { token, search } = useContext(AuthContext);
  const [repositories, setRepositories] = useState([]);
  const [pages, setPages] = useState(1);

  const order = async (token, type, order, page) => {
    let response;

    let newType;
    if (params.type == "aula") newType = "proyecto de aula";
    if (params.type == "grado") newType = "proyecto de grado";
    if (params.type == "invest") newType = "proyecto de investigación";

    if (type == "search" && search) {
      response = await searchRepositories(token, page, search);
      setPages(response.pages);
      setRepositories(response.repositories);
    }

    if (type == "todos") {
      switch (order) {
        case "byRate":
          response = await listAllRepoByRate(token, page);
          setPages(response.pages);
          setRepositories(response.repositories);
          break;
        case "byDate":
          response = await listAllRepoByDate(token, page);
          setPages(response.pages);
          setRepositories(response.repositories);
          break;
        case "byName":
          response = await listAllRepoByName(token, page);
          setPages(response.pages);
          setRepositories(response.repositories);
          break;
        default:
          break;
      }
    } else if (type != "search") {
      switch (order) {
        case "byRate":
          response = await listRepoByRate(token, newType, page);
          console.log(response);
          setPages(response.pages);
          setRepositories(response.repositories);
          break;
        case "byDate":
          response = await listRepoByDate(token, newType, page);
          setPages(response.pages);
          setRepositories(response.repositories);
          break;
        case "byName":
          response = await listRepoByName(token, newType, page);
          setPages(response.pages);
          setRepositories(response.repositories);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    order(token, params.type, params.sort, params.page);
  }, [params, token, search]);

  return (
    <>
      <div className="repositories">
        {repositories.map((repo) => (
          <div className="index_repository" key={repo._id}>
            <div className="index_repository-title">
              <p className="index_repository-title-text">{repo.title}</p>
            </div>
            <div className="index_repository-description">
              <p className="index_repository-description-text">
                {repo.description}
              </p>
            </div>
            <div className="index_repository-info">
              <div className="index_repository-info-tags">
                <p className="index_repository-info-tags-label">Etiquetas:</p>
                <p className="index_repository-info-tags-items">
                  {repo.tags.map((tag) => tag + ", ")}
                </p>
              </div>
              <div className="index_repository-info-links">
                <Link
                  target="_blank"
                  to={repo.link}
                  className="index_repository-info-links-button-link"
                >
                  Ir a GitHub
                </Link>
                <img
                  src={robot}
                  alt="user image"
                  className="index_repository-info-links-avatar"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="projects_navigation">
        {parseInt(params.page) > 1 ? (
          <Link
            className="projects_navigation-navegator navegator1"
            to={`/repositories/${params.sort}/${parseInt(params.page) - 1}`}
          >
            {"<"}
          </Link>
        ) : (
          <div className="projects_navigation-navegator navegator1"></div>
        )}
        <p className="projects_navigation-indicator">{params.page}</p>
        {parseInt(params.page) < pages ? (
          <Link
            className="projects_navigation-navegator navegator2"
            to={`/repositories/${params.sort}/${parseInt(params.page) + 1}`}
          >
            {">"}
          </Link>
        ) : (
          <div className="projects_navigation-navegator navegator2"></div>
        )}
      </div>
    </>
  );
}

export default Repositories;
