export default `
    type Customer {
        id: ID!
        first_name: String
        last_name: String
        email: String
        address: String
        zipcode: String
        city: String
        avatar: String
        birthday: String
        first_seen: String
        last_seen: String
        has_ordered: Boolean,
        latest_purchase: String
        has_newsletter: String
        groups: [String],
        nb_commands: Int
        total_spent: Float
    }

    type CustomerPage {
        items: [Customer]
        totalCount: Int
    }

    type Category {
        id: ID!
        name: String!
    }

    type CategoryPage {
        items: [Category]
        totalCount: Int
    }

    type Product {
        id: ID!
        category_id: ID!
        reference: String
        width: Float
        height: Float
        price: Float
        thumbnail: String
        image: String
        description: String
        stock: Int
    }

    type ProductPage {
        items: [Product]
        totalCount: Int
    }

    type CommandItem {
        product_id: ID!
        quantity: Int
    }

    type Command {
        id: ID!
        reference: String
        customer_id: ID!
        total_ex_taxes: Float
        delivery_fees: Float
        tax_rate: Float
        taxes: Float
        total: Float
        status: String
        returned: Boolean
        basket: [CommandItem]
    }

    type CommandPage {
        items: [Command]
        totalCount: Int
    }

    type Review {
        id: ID!
        date: String
        status: String
        command_id: ID!
        product_id: ID!
        customer_id: ID!
        rating: Int
        comment: String
    }

    type ReviewPage {
        items: [Review]
        totalCount: Int
    }

    type Query {
        getPageOfCustomers(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): CustomerPage
        getCustomer(id: ID!): Customer

        getPageOfCategories(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): CategoryPage
        getCategory(id: ID!): Category

        getPageOfProducts(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): ProductPage
        getProduct(id: ID!): Product

        getPageOfCommands(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): CommandPage
        getCommand(id: ID!): Command

        getPageOfReviews(page: Int, perPage: Int, sortField: String, sortOrder: String, filter: String): ReviewPage
        getReview(id: ID!): Review
    }

    type Mutation {
        createCustomer(data: String): Customer
        updateCustomer(data: String): Customer
        removeCustomer(id: ID!): Boolean

        createCategory(data: String): Category
        updateCategory(data: String): Category
        removeCategory(id: ID!): Boolean

        createProduct(data: String): Product
        updateProduct(data: String): Product
        removeProduct(id: ID!): Boolean

        createCommand(data: String): Command
        updateCommand(data: String): Command
        removeCommand(id: ID!): Boolean

        createReview(data: String): Review
        updateReview(data: String): Review
        removeReview(id: ID!): Boolean
    }
`;
