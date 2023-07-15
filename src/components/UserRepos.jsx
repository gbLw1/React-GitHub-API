import { useState } from "react";

export default function UserRepos({ repos }) {
  const [filterStr, setFilterStr] = useState("");

  const filteredRepos = repos.length
    ? repos.filter((r) => r.name.toLowerCase().includes(filterStr))
    : [];

  function clearFilter() {
    setFilterStr("");
  }

  return (
    <>
      <div className="row mb-4 justify-content-center text-center">
        <div className="col-lg-6">
          {/* Filter by search str */}
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for a specific repo"
              value={filterStr}
              onChange={({ target: { value } }) => setFilterStr(value.replace(' ', '-'))}
            />
            {filterStr && (
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={clearFilter}
              >
                Clear
              </button>
            )}
          </div>

          {/* repos count */}
          <p className="mb-1 text-secondary">
            Showing of {filterStr ? filteredRepos.length : repos.length} repo(s)
          </p>

          {/* List of repos */}
          <div className="list-group">
            {filterStr
              ? filteredRepos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="list-group-item list-group-item-action"
                  >
                    {repo.name}
                  </a>
                ))
              : repos.map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="list-group-item list-group-item-action"
                  >
                    {repo.name}
                  </a>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
