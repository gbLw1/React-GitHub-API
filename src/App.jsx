import { useState } from "react";
import AxiosClient from "./services/axios";
import UserInfo from "./components/UserInfo";
import UserRepos from "./components/UserRepos";
import Loading from "./components/Loading";

function App() {
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState(null);
  const [loading, setLoading] = useState(false);

  async function searchGitHubUser() {
    if (!userName) return;

    resetPage();

    try {
      setLoading(true);

      const response = await AxiosClient.get(`/users/${userName}`);
      
      setUserData(response.data);
      getUserRepos();
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setUserName("");
      setLoading(false);
    }
  }

  async function getUserRepos() {
    if (userRepos) setUserRepos("");
    if (errorMessage) setErrorMessage("");

    try {
      const response = await AxiosClient.get(`/users/${userName}/repos`);

      setUserRepos(response.data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  function resetPage() {
    if (errorMessage) setErrorMessage("");
    if (userData) setUserData(null);
    if (userRepos) setUserRepos(null);
  }

  return (
    <>
      <div className="container">
        {/* page title */}
        <div className="row mb-4">
          <div className="col-lg-12">
            <h1 className="text-center">Find someone's GitHub repos</h1>
          </div>
        </div>
        {/* Search user input */}
        <div className="row mb-4 justify-content-center">
          <div className="col-lg-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the GitHub username"
                  aria-label="Enter the GitHub username"
                  aria-describedby="button-addon2"
                  value={userName}
                  onChange={({ target: { value } }) =>
                    setUserName(value.trim())
                  }
                />
                <button
                  onClick={searchGitHubUser}
                  className="btn btn-outline-secondary"
                  type="button"
                  id="button-addon2"
                  disabled={!userName}
                >
                  Search
                </button>
              </div>
            </form>
            {errorMessage && (
              <p className="m-0 mt-3 text-danger text-center">{errorMessage}</p>
            )}
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <>
            {/* User info (name + profile image) */}
            {userData && <UserInfo data={userData} />}

            {/* List of user repos */}
            {userRepos && <UserRepos repos={userRepos} />}
          </>
        )}
      </div>
    </>
  );
}

export default App;
