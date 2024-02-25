import React, { useState, useEffect } from "react";
import ContributorCard from "../components/ContributorCard";

const Contributor = () => {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    const fetchContributors = async () => {
      const response = await fetch(
        "https://api.github.com/repos/TusharKesarwani/Front-End-Projects/contributors?per_page=50",
        {
          headers: {
            Authorization: " ",
          },
        }
      );
      const data = await response.json();
      const contributorData = data.map((contributor) => ({
        username: contributor.login,
        avatarUrl: contributor.avatar_url,
        profileUrl: contributor.html_url,
      }));
      setContributors(contributorData);
    };
    fetchContributors();
  }, []);

  return (
    <section className="contributors">
    <div className="head">
        <h1 className="bg-title">CONTRIBUTORS</h1>
        <h1 className="title">Contributors</h1>
    </div>
    <ul className="list-section">
        <li id="contributors-list">
            {contributors.map((contributor, index) => {
            return (
                <ContributorCard
                key={index}
                username={contributor.username}
                avatarUrl={contributor.avatarUrl}
                profileUrl={contributor.profileUrl}
                />
            );
            })}
        </li>
    </ul>

</section>
  );
};

export default Contributor;
