import adapter from "@sveltejs/adapter-static";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	kit: {
		adapter: adapter({
            pages: "build",
            assets: "build"
        }),

		// hydrate the <div id="svelte"> element in src/app.html
		target: "#svelte"
	}
};

export default config;
