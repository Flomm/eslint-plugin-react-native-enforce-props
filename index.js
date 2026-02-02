import fs from "fs";

const pkg = JSON.parse(
    fs.readFileSync(new URL("./package.json", import.meta.url), "utf8"),
);

const plugin = {
    meta: {
        name: pkg.name,
        version: pkg.version,
        namespace: "example",
    },
    rules: {
        // add rules here
    },
};

export default plugin;