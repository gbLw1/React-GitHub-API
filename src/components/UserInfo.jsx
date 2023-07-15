export default function UserInfo({ data }) {
  return (
    <>
      <div className="row mb-4 justify-content-center text-center">
        <div className="col-lg-6">
          <p className="h3">{data.login}</p>
          <img
            src={data.avatar_url}
            alt="user profile pic"
            className="rounded-circle"
            width="150px"
            height="150px"
          />
        </div>
      </div>
    </>
  );
}
