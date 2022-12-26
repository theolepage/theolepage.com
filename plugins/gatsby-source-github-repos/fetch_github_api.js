const fetcher = require("graphql-fetch")

const GITHUB_URL = "https://api.github.com/graphql"

const GRAPHQL_QUERY = `
    query ($query: String = "", $limit: Int = 0) {
        search(query: $query, type: REPOSITORY, first: $limit) {
            edges {
                node {
                    ... on Repository {
                        id
                        name
                        url
                        homepageUrl
                        description
                        createdAt
                        pushedAt
                        repositoryTopics(first: $limit) {
                            edges {
                                node {
                                    topic {
                                        name
                                    }
                                }
                            }
                        }
                        readme: object(expression:"master:README.md") {
                            ... on Blob{
                                text
                            }
                        }
                    }
                }
            }
        }
    }`

const fetchGithubApi = async (token, query, limit) => {
    const fetch = fetcher(GITHUB_URL)

    const headers = new Headers()
    headers.set("Authorization", `Bearer ${token}`)

    const variables = { query: query, limit: limit }

    return await fetch(GRAPHQL_QUERY, variables, {
        headers,
        method: "POST",
        mode: "cors"
    })
}

exports.fetchGithubApi = fetchGithubApi