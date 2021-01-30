const { fetchGithubApi } = require("./fetch_github_api")

exports.sourceNodes = ({ actions, createNodeId, createContentDigest },
    { token, query, limit }) => {
    const { createNode, createParentChildLink } = actions

    return new Promise((resolve, reject) => {
        if (token === undefined) {
            reject("Github API token must be defined.")
            return
        }

        fetchGithubApi(token, query, limit).then(result => {
            if (result.errors) {
                reject("Error(s) occured while fetching Github API.")
                console.error(result.errors)
                return
            }

            result.data.search.edges.map(edge => {
                const data = edge.node

                const repo = {
                    id: createNodeId(`Repository-${data.id}`),
                    parent: null,
                    children: [],
                    internal: {
                        type: "Repository",
                        contentDigest: createContentDigest(data),
                        mediaType: "text/plain"
                    },
                    ...data
                }
                createNode(repo)

                if (data.readme)
                {
                    const readme = {
                        id: createNodeId(`Readme-${data.id}`),
                        parent: repo.id,
                        children: [],
                        internal: {
                            type: "Readme",
                            content: data.readme.text,
                            contentDigest: createContentDigest(data.readme.text),
                            mediaType: "text/markdown"
                        },
                    }
                    createNode(readme)
                    createParentChildLink({ parent: repo, child: readme })
                }
            })
            resolve()
        })
    })
}