import React, { useEffect, useState } from "react";
import sanityClient from "../client.js";
import pattern from "../pattern.jpg";
import imageUrlBuilder from "@sanity/image-url";
import BlockContent from "@sanity/block-content-to-react";
import { getDefaultNormalizer } from "@testing-library/dom";

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

export default function ContactMe() {
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "author"]{
			name,
			bio,
			"authorImage": image.asset->url
		}`
      )
      .then((data) => setAuthor(data[0]))
      .catch(console.error);
  }, []);

  if (!author) return <div>Loading...</div>;
  return (
    <main className="relative">
      <img src={pattern} alt="Pattern Wallpaper" className="absolute w-full" />
      <div className="p-10 lg:pt-48 container mx-auto relative">
        <section className="bg-green-800 rounded-lg shadow-2xl lg:flex p-20">
          <img
            src={urlFor(author.authorImage).url()}
            className="rounded w-32 h-32 lg:w-64 lg:h-64 mr-8"
            alt={author.name}
          />
          <div className="text-lg flex flex-col justify-center">
            <h1 className="cursive text-6xl text-green-300 mb-4">Contact Me</h1>
            <div className="prose lg:prose-xl text-white">
              <p>
                Email:{" "}
                <a href="mailto:bethanywallace73@gmail.com">
                  bethanywallace73@gmail.com{" "}
                </a>
              </p>
              <p>
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/bethany-wallace-7619aa1b7/">
                  Bethany Wallace
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
