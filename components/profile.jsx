import PromptCard from "./PromptCard";

const Profile = ({ username, desc, data }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-center">
        <span className="blue_gradient">{username} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            // handleEdit={() => handleEdit && handleEdit(post)}
            // handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
