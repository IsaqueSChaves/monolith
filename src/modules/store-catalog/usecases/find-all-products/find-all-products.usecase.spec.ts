import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Description 1",
    salesPrice: 100,
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Description 2",
    salesPrice: 200,
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2]))
    };
};

describe("Find all products test", () => {

    it("should return all products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute();

        expect(result.products.length).toEqual(2);
        expect(result.products[0].id).toEqual(product.id.id);
        expect(result.products[1].id).toEqual(product2.id.id);
        expect(result.products[0].name).toEqual(product.name);
        expect(result.products[1].name).toEqual(product2.name);
        expect(result.products[0].description).toEqual(product.description);
        expect(result.products[1].description).toEqual(product2.description);
        expect(result.products[0].salesPrice).toEqual(product.salesPrice);
        expect(result.products[1].salesPrice).toEqual(product2.salesPrice);
    });

});