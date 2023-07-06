import {
  categoriesReducer,
  CATEGORIES_INITIAL_STATE,
} from "../categories.reducer";

import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from "../categories.actions";

describe("Category Reducer tests", () => {
  test("fetch categories start", () => {
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: true,
    };

    expect(
      categoriesReducer(CATEGORIES_INITIAL_STATE, fetchCategoriesStart())
    ).toEqual(expectedState);
  });

  test("fetch categories success", () => {
    const mockData = [
      {
        title: "mens",
        imageUrl: "test",
        items: [
          { id: 1, name: "Product 1" },
          { id: 2, name: "Product 2" },
        ],
      },
      {
        title: "womens",
        imageUrl: "test2",
        items: [
          { id: 3, name: "Product 3" },
          { id: 4, name: "Product 4" },
        ],
      },
    ];
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      isLoading: false,
      categories: mockData,
    };

    expect(
      categoriesReducer(
        CATEGORIES_INITIAL_STATE,
        fetchCategoriesSuccess(mockData)
      )
    ).toEqual(expectedState);
  });

  test("fetch categories error", () => {
    const mockError = new Error("Error fetching categories");
    const expectedState = {
      ...CATEGORIES_INITIAL_STATE,
      error: mockError,
      isLoading: false,
    };

    expect(
      categoriesReducer(
        CATEGORIES_INITIAL_STATE,
        fetchCategoriesFailed(mockError)
      )
    ).toEqual(expectedState);
  });
});
