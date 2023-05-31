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

          <textarea></textarea>
        </label>
      </form>
    </section>
  );
}

export default Form;
