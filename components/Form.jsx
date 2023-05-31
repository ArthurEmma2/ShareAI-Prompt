import Link from "next/link";

function Form({ type, post, setPost, submitting, handleSubmit }) {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed
        quas reprehenderit eos quo nisi exercitationem sit voluptati bus fugiat{" "}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-20 w-full max-w-2xl flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) =>
              setPost({
                ...post,
                prompt: e.target.value,
              })
            }
            placeholder="write your prompt.."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {``}
            <span className=" font-normal ">
              (#AI, #Product #webdevelopment #coding)
            </span>
          </span>

          <textarea
            value={post.tag}
            onChange={(e) =>
              setPost({
                ...post,
                tag: e.target.value,
              })
            }
            placeholder="#tag"
            required
            className="form_input"
          ></textarea>
        </label>
        <div className="flex-end mx-3 gap-4 mt-4">
          <Link className=" text-gray-500 text-sm" href="/">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className=" bg-orange-500 rounded-full text-sm text-white py-1.5 px-5"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Form;
