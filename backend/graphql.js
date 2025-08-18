const { GraphQLObjectType, GraphQLSchema, GraphQLList, GraphQLString, GraphQLID, GraphQLInt } = require("graphql");

const productModel = require("./models/productModels"); 

// Define Price Type (nested)
const PriceType = new GraphQLObjectType({
  name: "Price",
  fields: () => ({
    mrp: { type: GraphQLString },
    offerprice: { type: GraphQLString },
    stock: { type: GraphQLString },
    metric: { type: GraphQLString },
  }),
});

// Define Product Type
const ProductType = new GraphQLObjectType({
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    category: { type: GraphQLString },
    deal: { type: GraphQLString },
    productname: { type: GraphQLString },
    url: { type: GraphQLString },
    sku: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    price: { type: new GraphQLList(PriceType) },
    description1: { type: GraphQLString },
    description2: { type: GraphQLString },
    detail: { type: GraphQLString },
    information: { type: GraphQLString },
    status: { type: GraphQLInt },
    isdeal: { type: GraphQLInt },
    createdBy: { type: GraphQLID },
    updatedBy: { type: GraphQLID },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    products: {
      type: new GraphQLList(ProductType),
      resolve: async () => {
        try {
          return await productModel.find();
        } catch (err) {
          throw new Error("Failed to fetch products: " + err.message);
        }
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
