# GraphQLNode
Ejemplo de servidor GraphQL


comando curl

QUERY='{ "query": "{ productos { id nombre precio stock } }" }'
curl -X POST http://165.227.2.90:5678/graphql \
  -H "Content-Type: application/json" \
  -d "$QUERY"
